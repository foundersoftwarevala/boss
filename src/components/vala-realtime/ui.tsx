import { useState, type ReactNode } from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-border bg-card/70 p-4 shadow-sm backdrop-blur", className)}>
      {(title || action) && (
        <header className="mb-3 flex items-center justify-between gap-2">
          {title && <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h3>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function Kpi({ label, value, hint, tone = "default" }: { label: string; value: ReactNode; hint?: string; tone?: "default" | "good" | "bad" }) {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn("mt-1 text-2xl font-bold tabular-nums", tone === "good" && "text-primary", tone === "bad" && "text-destructive")}>{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "good" | "warn" | "bad" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase",
        tone === "default" && "border-border bg-muted text-muted-foreground",
        tone === "good" && "border-primary/40 bg-primary/10 text-primary",
        tone === "warn" && "border-accent bg-accent text-accent-foreground",
        tone === "bad" && "border-destructive/40 bg-destructive/10 text-destructive",
      )}
    >
      {children}
    </span>
  );
}

export const statusTone = (s: string) =>
  ["active", "online", "delivered"].includes(s) ? "good" : ["suspended", "draining", "partial", "pending"].includes(s) ? "warn" : ["revoked", "offline", "failed"].includes(s) ? "bad" : "default";

export function Empty({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">{children}</div>;
}

export function Table({ head, rows, empty }: { head: string[]; rows: ReactNode[][]; empty?: string }) {
  if (!rows.length) return <Empty>{empty ?? "Nothing recorded yet."}</Empty>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
            {head.map((h) => <th key={h} className="px-2 py-2 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/40">
              {r.map((c, j) => <td key={j} className="whitespace-nowrap px-2 py-2 align-middle">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CopyBtn({ value, label = "Copy" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        void navigator.clipboard.writeText(value);
        setDone(true);
        toast.success("Copied");
        setTimeout(() => setDone(false), 1200);
      }}
      className="rounded-md border border-border p-1 text-muted-foreground hover:text-foreground"
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

export function SecretField({ label, value, masked }: { label: string; value: string; masked?: string }) {
  const [show, setShow] = useState(false);
  const display = masked !== undefined ? masked : show ? value : "•".repeat(Math.min(24, value.length));
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate font-mono text-xs">{display}</p>
      </div>
      {masked === undefined && (
        <div className="flex shrink-0 gap-1">
          <button type="button" aria-label="Toggle" onClick={() => setShow((s) => !s)} className="rounded-md border border-border p-1 text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
          <CopyBtn value={value} />
        </div>
      )}
    </div>
  );
}

export function Bars({ data, height = 120 }: { data: { label: string; value: number }[]; height?: number }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  if (!data.length) return <Empty>No data in this window.</Empty>;
  return (
    <div className="flex items-end gap-[3px]" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} title={`${d.label}: ${d.value}`} className="flex-1 rounded-t bg-primary/70 hover:bg-primary" style={{ height: `${Math.max(2, (d.value / max) * 100)}%` }} />
      ))}
    </div>
  );
}

export function HBars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  if (!data.length) return <Empty>No data in this window.</Empty>;
  return (
    <div className="space-y-1.5">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex justify-between text-xs"><span className="truncate">{d.label}</span><span className="tabular-nums text-muted-foreground">{d.value}</span></div>
          <div className="h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${(d.value / max) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export const inputCls = "w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring";
export const btnCls = "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50";
export const btnGhost = "inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted disabled:opacity-50";

export function JsonView({ value }: { value: unknown }) {
  const text = JSON.stringify(value, null, 2);
  return (
    <div className="relative">
      <div className="absolute right-2 top-2"><CopyBtn value={text} label="Copy JSON" /></div>
      <pre className="max-h-80 overflow-auto rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs leading-relaxed">{text}</pre>
    </div>
  );
}
