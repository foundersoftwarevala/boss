import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "crypto";
import { z } from "zod";
import { getAdmin, publishEvent, sha256 } from "@/lib/vala-realtime/realtime.server";

const Body = z.object({
  channel: z.string().min(1).max(164).regex(/^[A-Za-z0-9_\-=@,.;]+$/),
  event: z.string().min(1).max(200),
  data: z.unknown(),
});

/** REST publish: Authorization: Bearer <app_key>:<app_secret> */
export const Route = createFileRoute("/api/public/realtime/publish")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = request.headers.get("authorization") ?? "";
        const [key, secret] = auth.replace(/^Bearer\s+/i, "").split(":");
        if (!key || !secret) return Response.json({ error: "Missing credentials" }, { status: 401 });
        const admin = await getAdmin();
        const { data: app } = await admin.from("rt_apps").select("id, status, region, secret_hash").eq("app_key", key).maybeSingle();
        const a = Buffer.from(sha256(secret));
        const b = Buffer.from(app?.secret_hash ?? "0".repeat(64));
        if (!app || a.length !== b.length || !timingSafeEqual(a, b)) return Response.json({ error: "Invalid credentials" }, { status: 401 });
        if (app.status !== "active") return Response.json({ error: `Application is ${app.status}` }, { status: 403 });
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Invalid body" }, { status: 400 });
        const res = await publishEvent({ app: app.id, channel: parsed.data.channel, event: parsed.data.event, payload: parsed.data.data, sender: "rest-api", source: "rest", region: app.region });
        return Response.json(res);
      },
    },
  },
});
