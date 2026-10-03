import { createHash, createHmac, randomBytes } from "crypto";

export const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
export const token = (bytes: number) => randomBytes(bytes).toString("hex");

type Admin = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

export async function getAdmin(): Promise<Admin> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export async function audit(actor: string | null, app: string | null, action: string, target?: string, meta: Record<string, unknown> = {}) {
  const admin = await getAdmin();
  // Never write secrets into the audit trail.
  await admin.from("rt_audit").insert({ actor, app, action, target: target ?? null, meta: meta as never });
}

/** Persist an event and fan it out to the app's webhooks. Returns the stored event. */
export async function publishEvent(input: {
  app: string; channel: string; event: string; payload: unknown; sender: string | null; source: string; region: string | null;
}) {
  const admin = await getAdmin();
  const started = Date.now();
  const { data: ev, error } = await admin
    .from("rt_events")
    .insert({
      app: input.app, channel: input.channel, event: input.event, payload: (input.payload ?? {}) as never,
      sender: input.sender, source: input.source, region: input.region, status: "delivered",
    })
    .select("id, created_at")
    .single();
  if (error || !ev) throw new Error(error?.message ?? "Event could not be stored");

  const { data: hooks } = await admin.from("rt_webhooks").select("id, url, events, signing_secret").eq("app", input.app).eq("active", true);
  let failed = 0;
  for (const h of hooks ?? []) {
    if (h.events.length && !h.events.includes(input.event)) continue;
    const body = JSON.stringify({ id: ev.id, channel: input.channel, event: input.event, data: input.payload, time: ev.created_at });
    const sig = createHmac("sha256", h.signing_secret).update(body).digest("hex");
    const t0 = Date.now();
    let status: number | null = null;
    let err: string | null = null;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(h.url, { method: "POST", headers: { "content-type": "application/json", "x-vala-signature": sig }, body, signal: ctrl.signal });
      clearTimeout(timer);
      status = res.status;
      if (!res.ok) err = `HTTP ${res.status}`;
    } catch (e) {
      err = e instanceof Error ? e.message : "delivery failed";
    }
    if (err) failed++;
    await admin.from("rt_webhook_deliveries").insert({ webhook: h.id, app: input.app, event_id: ev.id, status, duration_ms: Date.now() - t0, error: err });
    const { data: cur } = await admin.from("rt_webhooks").select("failures").eq("id", h.id).single();
    await admin.from("rt_webhooks").update({ last_status: status, last_delivery_at: new Date().toISOString(), failures: err ? (cur?.failures ?? 0) + 1 : 0 }).eq("id", h.id);
  }
  const latency = Date.now() - started;
  await admin.from("rt_events").update({ latency_ms: latency, status: failed ? "partial" : "delivered" }).eq("id", ev.id);
  return { id: ev.id, latency_ms: latency, webhook_failures: failed };
}
