import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { audit, getAdmin, publishEvent, sha256, token } from "./realtime.server";

const channelName = z.string().min(1).max(164).regex(/^[A-Za-z0-9_\-=@,.;]+$/, "Invalid channel name");

export const rtCreateApp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      name: z.string().trim().min(2).max(80),
      environment: z.enum(["development", "staging", "production"]),
      region: z.string().max(40).nullable(),
      node_id: z.string().uuid().nullable(),
      plan: z.string().min(1).max(40),
      client_events: z.boolean(),
      require_tls: z.boolean(),
      allowed_origins: z.array(z.string().max(200)).max(20),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const secret = token(24);
    const row = {
      ...data,
      owner_id: context.userId,
      app_id: `app_${token(6)}`,
      app_key: `pk_${token(10)}`,
      secret_hash: sha256(secret),
      secret_last4: secret.slice(-4),
    };
    const { data: app, error } = await context.supabase.from("rt_apps").insert(row).select("id, app_id, app_key").single();
    if (error) throw new Error(error.message);
    await audit(context.userId, app.id, "app.created", data.name, { environment: data.environment, plan: data.plan });
    // The plaintext secret is returned exactly once and never stored.
    return { ...app, secret };
  });

export const rtRotateSecret = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), rotateKey: z.boolean().default(false) }).parse(d))
  .handler(async ({ data, context }) => {
    const secret = token(24);
    const patch: Record<string, string> = { secret_hash: sha256(secret), secret_last4: secret.slice(-4), updated_at: new Date().toISOString() };
    if (data.rotateKey) patch["app_key"] = `pk_${token(10)}`;
    const { data: app, error } = await context.supabase.from("rt_apps").update(patch).eq("id", data.id).select("id, app_key").single();
    if (error) throw new Error(error.message);
    await audit(context.userId, data.id, data.rotateKey ? "credentials.rotated" : "secret.regenerated");
    return { app_key: app.app_key, secret };
  });

export const rtSetAppStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), status: z.enum(["active", "suspended", "revoked"]) }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("rt_apps").update({ status: data.status, updated_at: new Date().toISOString() }).eq("id", data.id);
    if (error) throw new Error(error.message);
    await audit(context.userId, data.id, `app.${data.status}`);
    return { ok: true };
  });

export const rtUpdateApp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      id: z.string().uuid(), name: z.string().trim().min(2).max(80), client_events: z.boolean(), require_tls: z.boolean(),
      allowed_origins: z.array(z.string().max(200)).max(20), plan: z.string().max(40),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const { error } = await context.supabase.from("rt_apps").update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) throw new Error(error.message);
    await audit(context.userId, id, "app.settings_updated");
    return { ok: true };
  });

export const rtDeleteApp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: app } = await context.supabase.from("rt_apps").select("name").eq("id", data.id).single();
    await audit(context.userId, null, "app.deleted", app?.name ?? data.id);
    const { error } = await context.supabase.from("rt_apps").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const rtPublish = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ app: z.string().uuid(), channel: channelName, event: z.string().min(1).max(200), payload: z.unknown() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: app } = await context.supabase.from("rt_apps").select("id, status, region").eq("id", data.app).single();
    if (!app) throw new Error("Application not found");
    if (app.status !== "active") throw new Error(`Application is ${app.status}`);
    return publishEvent({ app: app.id, channel: data.channel, event: data.event, payload: data.payload, sender: context.userId, source: "console", region: app.region });
  });

export const rtAddWebhook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ app: z.string().uuid(), url: z.string().url().max(500).startsWith("https://"), events: z.array(z.string().max(200)).max(50) }).parse(d))
  .handler(async ({ data, context }) => {
    const signing_secret = `whsec_${token(16)}`;
    const { data: hook, error } = await context.supabase.from("rt_webhooks").insert({ ...data, signing_secret }).select("id").single();
    if (error) throw new Error(error.message);
    await audit(context.userId, data.app, "webhook.created", data.url);
    return { id: hook.id, signing_secret };
  });

export const rtRemoveWebhook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: hook } = await context.supabase.from("rt_webhooks").select("app, url").eq("id", data.id).single();
    const { error } = await context.supabase.from("rt_webhooks").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await audit(context.userId, hook?.app ?? null, "webhook.removed", hook?.url);
    return { ok: true };
  });

export const rtRegisterNode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ name: z.string().trim().min(2).max(80), host: z.string().trim().min(3).max(200), region: z.string().max(40), capacity: z.number().int().min(1).max(10_000_000) }).parse(d))
  .handler(async ({ data, context }) => {
    const key = `nk_${token(20)}`;
    const { data: node, error } = await context.supabase
      .from("rt_nodes").insert({ ...data, node_key_hash: sha256(key), node_key_last4: key.slice(-4), status: "pending" }).select("id").single();
    if (error) throw new Error(error.message);
    await audit(context.userId, null, "node.registered", data.name, { region: data.region, host: data.host });
    return { id: node.id, node_key: key };
  });

export const rtAddRegion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ code: z.string().trim().min(2).max(40).regex(/^[a-z0-9-]+$/), name: z.string().trim().min(2).max(80) }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("rt_regions").insert(data);
    if (error) throw new Error(error.message);
    await audit(context.userId, null, "region.added", data.code);
    return { ok: true };
  });

export const rtSetNodeStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid(), status: z.enum(["online", "draining", "offline", "pending"]) }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("rt_nodes").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    // Failover: move apps off a node that is taken out of service.
    if (data.status === "offline" || data.status === "draining") {
      const { data: node } = await context.supabase.from("rt_nodes").select("region").eq("id", data.id).single();
      const { data: target } = await context.supabase
        .from("rt_nodes").select("id").eq("status", "online").eq("region", node?.region ?? "").neq("id", data.id).limit(1).maybeSingle();
      if (target) {
        const admin = await getAdmin();
        await admin.from("rt_apps").update({ node_id: target.id }).eq("node_id", data.id);
        await audit(context.userId, null, "node.failover", data.id, { to: target.id });
      }
    }
    await audit(context.userId, null, `node.${data.status}`, data.id);
    return { ok: true };
  });
