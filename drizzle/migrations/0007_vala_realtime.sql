CREATE OR REPLACE FUNCTION public.rt_is_operator() RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text IN ('admin','boss','boss_owner','super_admin','founder','developer'))
$$;

CREATE TABLE public.rt_plans (
  code text PRIMARY KEY, name text NOT NULL, max_connections int NOT NULL, max_messages_day int NOT NULL,
  max_channels int NOT NULL, price_usd numeric NOT NULL DEFAULT 0, sort int NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.rt_plans TO authenticated; GRANT ALL ON public.rt_plans TO service_role;
ALTER TABLE public.rt_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt plans read" ON public.rt_plans FOR SELECT TO authenticated USING (true);
CREATE POLICY "rt plans ops" ON public.rt_plans FOR ALL TO authenticated USING (public.rt_is_operator()) WITH CHECK (public.rt_is_operator());
GRANT INSERT, UPDATE, DELETE ON public.rt_plans TO authenticated;
INSERT INTO public.rt_plans(code,name,max_connections,max_messages_day,max_channels,price_usd,sort) VALUES
 ('sandbox','Sandbox',100,200000,100,0,1),('startup','Startup',1000,2000000,1000,49,2),('business','Business',10000,20000000,10000,299,3)
ON CONFLICT DO NOTHING;

CREATE TABLE public.rt_regions (
  code text PRIMARY KEY, name text NOT NULL, status text NOT NULL DEFAULT 'active', created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rt_regions TO authenticated; GRANT ALL ON public.rt_regions TO service_role;
ALTER TABLE public.rt_regions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt regions read" ON public.rt_regions FOR SELECT TO authenticated USING (true);
CREATE POLICY "rt regions ops" ON public.rt_regions FOR ALL TO authenticated USING (public.rt_is_operator()) WITH CHECK (public.rt_is_operator());

CREATE TABLE public.rt_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, region text REFERENCES public.rt_regions(code),
  host text NOT NULL, status text NOT NULL DEFAULT 'pending', capacity int NOT NULL DEFAULT 10000,
  connections int NOT NULL DEFAULT 0, cpu_pct numeric, mem_pct numeric, node_key_hash text, node_key_last4 text,
  is_primary boolean NOT NULL DEFAULT false, last_heartbeat timestamptz, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rt_nodes TO authenticated; GRANT ALL ON public.rt_nodes TO service_role;
ALTER TABLE public.rt_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt nodes read" ON public.rt_nodes FOR SELECT TO authenticated USING (true);
CREATE POLICY "rt nodes ops" ON public.rt_nodes FOR ALL TO authenticated USING (public.rt_is_operator()) WITH CHECK (public.rt_is_operator());

CREATE TABLE public.rt_apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), app_id text NOT NULL UNIQUE, owner_id uuid NOT NULL,
  name text NOT NULL, environment text NOT NULL DEFAULT 'development', region text, node_id uuid REFERENCES public.rt_nodes(id) ON DELETE SET NULL,
  plan text NOT NULL DEFAULT 'sandbox' REFERENCES public.rt_plans(code), status text NOT NULL DEFAULT 'active',
  app_key text NOT NULL UNIQUE, secret_hash text NOT NULL, secret_last4 text NOT NULL,
  client_events boolean NOT NULL DEFAULT false, require_tls boolean NOT NULL DEFAULT true, allowed_origins text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rt_apps TO authenticated; GRANT ALL ON public.rt_apps TO service_role;
ALTER TABLE public.rt_apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt apps own" ON public.rt_apps FOR ALL TO authenticated USING (owner_id = auth.uid() OR public.rt_is_operator()) WITH CHECK (owner_id = auth.uid() OR public.rt_is_operator());

CREATE OR REPLACE FUNCTION public.rt_can_app(_app uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.rt_is_operator() OR EXISTS (SELECT 1 FROM public.rt_apps WHERE id = _app AND owner_id = auth.uid())
$$;

CREATE TABLE public.rt_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), app uuid NOT NULL REFERENCES public.rt_apps(id) ON DELETE CASCADE,
  name text NOT NULL, type text NOT NULL DEFAULT 'public', status text NOT NULL DEFAULT 'active',
  message_count bigint NOT NULL DEFAULT 0, last_activity timestamptz, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(app, name));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rt_channels TO authenticated; GRANT ALL ON public.rt_channels TO service_role;
ALTER TABLE public.rt_channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt channels" ON public.rt_channels FOR ALL TO authenticated USING (public.rt_can_app(app)) WITH CHECK (public.rt_can_app(app));

CREATE TABLE public.rt_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), app uuid NOT NULL REFERENCES public.rt_apps(id) ON DELETE CASCADE,
  channel text NOT NULL, event text NOT NULL, payload jsonb NOT NULL DEFAULT '{}', sender text,
  source text NOT NULL DEFAULT 'console', status text NOT NULL DEFAULT 'delivered', latency_ms int, region text,
  error text, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX rt_events_app_time ON public.rt_events(app, created_at DESC);
CREATE INDEX rt_events_time ON public.rt_events(created_at DESC);
GRANT SELECT, INSERT ON public.rt_events TO authenticated; GRANT ALL ON public.rt_events TO service_role;
ALTER TABLE public.rt_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt events read" ON public.rt_events FOR SELECT TO authenticated USING (public.rt_can_app(app));
CREATE POLICY "rt events insert" ON public.rt_events FOR INSERT TO authenticated WITH CHECK (public.rt_can_app(app));

CREATE OR REPLACE FUNCTION public.rt_on_event() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.rt_channels(app, name, type, message_count, last_activity)
  VALUES (NEW.app, NEW.channel, CASE WHEN NEW.channel LIKE 'private-%' THEN 'private' WHEN NEW.channel LIKE 'presence-%' THEN 'presence' ELSE 'public' END, 1, NEW.created_at)
  ON CONFLICT (app, name) DO UPDATE SET message_count = rt_channels.message_count + 1, last_activity = NEW.created_at;
  RETURN NEW;
END $$;
CREATE TRIGGER rt_events_channel AFTER INSERT ON public.rt_events FOR EACH ROW EXECUTE FUNCTION public.rt_on_event();

CREATE TABLE public.rt_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), app uuid NOT NULL REFERENCES public.rt_apps(id) ON DELETE CASCADE,
  url text NOT NULL, events text[] NOT NULL DEFAULT '{}', active boolean NOT NULL DEFAULT true,
  signing_secret text NOT NULL, last_status int, last_delivery_at timestamptz, failures int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rt_webhooks TO authenticated; GRANT ALL ON public.rt_webhooks TO service_role;
ALTER TABLE public.rt_webhooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt webhooks" ON public.rt_webhooks FOR ALL TO authenticated USING (public.rt_can_app(app)) WITH CHECK (public.rt_can_app(app));

CREATE TABLE public.rt_webhook_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), webhook uuid NOT NULL REFERENCES public.rt_webhooks(id) ON DELETE CASCADE,
  app uuid NOT NULL REFERENCES public.rt_apps(id) ON DELETE CASCADE, event_id uuid, status int, duration_ms int, error text,
  created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.rt_webhook_deliveries TO authenticated; GRANT ALL ON public.rt_webhook_deliveries TO service_role;
ALTER TABLE public.rt_webhook_deliveries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt deliveries" ON public.rt_webhook_deliveries FOR SELECT TO authenticated USING (public.rt_can_app(app));

CREATE TABLE public.rt_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), actor uuid, app uuid REFERENCES public.rt_apps(id) ON DELETE SET NULL,
  action text NOT NULL, target text, meta jsonb NOT NULL DEFAULT '{}', created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.rt_audit TO authenticated; GRANT ALL ON public.rt_audit TO service_role;
ALTER TABLE public.rt_audit ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rt audit" ON public.rt_audit FOR SELECT TO authenticated USING (actor = auth.uid() OR public.rt_is_operator() OR (app IS NOT NULL AND public.rt_can_app(app)));

ALTER PUBLICATION supabase_realtime ADD TABLE public.rt_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rt_nodes;