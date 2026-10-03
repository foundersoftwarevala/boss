import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "crypto";
import { z } from "zod";
import { getAdmin, sha256 } from "@/lib/vala-realtime/realtime.server";

const Body = z.object({
  node_id: z.string().uuid(),
  connections: z.number().int().min(0).max(100_000_000),
  cpu_pct: z.number().min(0).max(100).optional(),
  mem_pct: z.number().min(0).max(100).optional(),
});

/** Node heartbeat: Authorization: Bearer <node_key>. Marks the node online with real metrics. */
export const Route = createFileRoute("/api/public/realtime/heartbeat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!key || !parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });
        const admin = await getAdmin();
        const { data: node } = await admin.from("rt_nodes").select("id, node_key_hash, status").eq("id", parsed.data.node_id).maybeSingle();
        const a = Buffer.from(sha256(key));
        const b = Buffer.from(node?.node_key_hash ?? "0".repeat(64));
        if (!node || a.length !== b.length || !timingSafeEqual(a, b)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        await admin.from("rt_nodes").update({
          connections: parsed.data.connections, cpu_pct: parsed.data.cpu_pct ?? null, mem_pct: parsed.data.mem_pct ?? null,
          last_heartbeat: new Date().toISOString(), status: node.status === "draining" ? "draining" : "online",
        }).eq("id", node.id);
        return Response.json({ ok: true });
      },
    },
  },
});
