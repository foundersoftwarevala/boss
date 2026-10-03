import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type RtApp = {
  id: string; app_id: string; owner_id: string; name: string; environment: string; region: string | null; node_id: string | null;
  plan: string; status: string; app_key: string; secret_last4: string; client_events: boolean; require_tls: boolean;
  allowed_origins: string[]; created_at: string;
};
export type RtEvent = {
  id: string; app: string; channel: string; event: string; payload: unknown; sender: string | null; source: string;
  status: string; latency_ms: number | null; region: string | null; error: string | null; created_at: string;
};
export type RtNode = {
  id: string; name: string; region: string | null; host: string; status: string; capacity: number; connections: number;
  cpu_pct: number | null; mem_pct: number | null; node_key_last4: string | null; last_heartbeat: string | null; created_at: string;
};

const q = <T,>(key: string[], fn: () => PromiseLike<{ data: T | null; error: { message: string } | null }>) => ({
  queryKey: ["rt", ...key],
  queryFn: async () => {
    const { data, error } = await fn();
    if (error) throw new Error(error.message);
    return (data ?? []) as T;
  },
});

export const useApps = () => useQuery(q<RtApp[]>(["apps"], () => supabase.from("rt_apps").select("*").order("created_at", { ascending: false })));
export const useNodes = () => useQuery(q<RtNode[]>(["nodes"], () => supabase.from("rt_nodes").select("*").order("created_at")));
export const useRegions = () => useQuery(q<{ code: string; name: string; status: string; created_at: string }[]>(["regions"], () => supabase.from("rt_regions").select("*").order("code")));
export const usePlans = () => useQuery(q<{ code: string; name: string; max_connections: number; max_messages_day: number; max_channels: number; price_usd: number }[]>(["plans"], () => supabase.from("rt_plans").select("*").order("sort")));
export const useChannels = () => useQuery(q<{ id: string; app: string; name: string; type: string; status: string; message_count: number; last_activity: string | null; created_at: string }[]>(["channels"], () => supabase.from("rt_channels").select("*").order("last_activity", { ascending: false, nullsFirst: false }).limit(500)));
export const useWebhooks = () => useQuery(q<{ id: string; app: string; url: string; events: string[]; active: boolean; last_status: number | null; last_delivery_at: string | null; failures: number; created_at: string }[]>(["webhooks"], () => supabase.from("rt_webhooks").select("id, app, url, events, active, last_status, last_delivery_at, failures, created_at").order("created_at", { ascending: false })));
export const useDeliveries = () => useQuery(q<{ id: string; webhook: string; app: string; status: number | null; duration_ms: number | null; error: string | null; created_at: string }[]>(["deliveries"], () => supabase.from("rt_webhook_deliveries").select("*").order("created_at", { ascending: false }).limit(200)));
export const useAudit = () => useQuery(q<{ id: string; actor: string | null; app: string | null; action: string; target: string | null; meta: unknown; created_at: string }[]>(["audit"], () => supabase.from("rt_audit").select("*").order("created_at", { ascending: false }).limit(300)));

/** Events from the last 24h (capped), refreshed by the realtime feed. */
export const useRecentEvents = () =>
  useQuery(q<RtEvent[]>(["events"], () => supabase.from("rt_events").select("*").gte("created_at", new Date(Date.now() - 864e5).toISOString()).order("created_at", { ascending: false }).limit(1000)));

/** Real database change feed for rt_events. New rows are pushed into the cache. */
export function useLiveEvents() {
  const qc = useQueryClient();
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const ch = supabase
      .channel("vala-realtime-events")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "rt_events" }, (p) => {
        const row = p.new as RtEvent;
        qc.setQueryData<RtEvent[]>(["rt", "events"], (prev) => [row, ...(prev ?? [])].slice(0, 1000));
        void qc.invalidateQueries({ queryKey: ["rt", "channels"] });
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "rt_events" }, (p) => {
        const row = p.new as RtEvent;
        qc.setQueryData<RtEvent[]>(["rt", "events"], (prev) => (prev ?? []).map((e) => (e.id === row.id ? row : e)));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "rt_nodes" }, () => {
        void qc.invalidateQueries({ queryKey: ["rt", "nodes"] });
      })
      .subscribe((s) => setConnected(s === "SUBSCRIBED"));
    return () => {
      void supabase.removeChannel(ch);
    };
  }, [qc]);
  return connected;
}

/** Real presence: operators currently connected to this console. */
export function usePresence(userId: string | null, email: string | null) {
  const [members, setMembers] = useState<{ key: string; email: string | null; at: string }[]>([]);
  useEffect(() => {
    if (!userId) return;
    const ch = supabase.channel("presence-vala-realtime-console", { config: { presence: { key: userId } } });
    ch.on("presence", { event: "sync" }, () => {
      const state = ch.presenceState<{ email: string | null; at: string }>();
      setMembers(Object.entries(state).map(([key, metas]) => ({ key, email: metas[0]?.email ?? null, at: metas[0]?.at ?? "" })));
    }).subscribe((s) => {
      if (s === "SUBSCRIBED") void ch.track({ email, at: new Date().toISOString() });
    });
    return () => {
      void supabase.removeChannel(ch);
    };
  }, [userId, email]);
  return members;
}

export const fmtTime = (iso: string | null) => (iso ? new Date(iso).toLocaleTimeString([], { hour12: false }) : "—");
export const fmtDate = (iso: string | null) => (iso ? new Date(iso).toLocaleString([], { hour12: false }) : "—");
export const nodeLive = (n: RtNode) => n.status === "online" && !!n.last_heartbeat && Date.now() - new Date(n.last_heartbeat).getTime() < 120_000;
