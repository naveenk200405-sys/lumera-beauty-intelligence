import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { Check, Upload, Camera, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { inr, passport, type Product, type Verdict, type Check as CheckT } from "@/lib/data";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("text-[1.05rem] font-semibold tracking-[0.32em] text-foreground", className)} aria-label="LUMERA home">
      LUMERA
    </Link>
  );
}

export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
      {children}
    </motion.div>
  );
}

export function CountUp({ to, prefix = "", duration = 1.4, className, format = true }: { to: number; prefix?: string; duration?: number; className?: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, duration]);
  return <span ref={ref} className={cn("tabular-nums", className)}>{prefix}{format ? v.toLocaleString("en-IN") : v}</span>;
}

export function MatchScore({ value, size = 168, label = "LUMERA MATCH", className }: { value: number; size?: number; label?: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("relative inline-flex flex-col items-center", className)} style={{ width: size }}>
      <svg ref={ref} width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-border" strokeWidth={3} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-rose" strokeWidth={3} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: c * (1 - value / 100) } : {}}
          transition={{ duration: 1.6, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ height: size }}>
        <CountUp to={value} duration={1.6} className="text-[2.6em] font-light leading-none tracking-tight" format={false} />
        <span className="eyebrow mt-1 !text-[0.55rem]">{label}</span>
      </div>
    </div>
  );
}

const verdictStyles: Record<Verdict, string> = {
  BUY: "bg-buy-soft text-buy border-buy/25",
  THINK: "bg-think-soft text-think border-think/25",
  SKIP: "bg-skip-soft text-skip border-skip/25",
};

export function VerdictBadge({ verdict, size = "md", className }: { verdict: Verdict; size?: "sm" | "md" | "lg"; className?: string }) {
  return (
    <motion.span
      key={verdict}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease }}
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-semibold tracking-[0.24em]",
        size === "sm" && "h-6 px-2.5 text-[0.6rem]",
        size === "md" && "h-8 px-4 text-xs",
        size === "lg" && "h-14 px-8 text-lg",
        verdictStyles[verdict],
        className,
      )}
    >
      {verdict}
    </motion.span>
  );
}

export function Reasons({ items }: { items: { label: string; ok: boolean; detail?: string }[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((r, i) => (
        <motion.li key={r.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08, ease }} className="flex items-start gap-3 text-sm">
          <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", r.ok ? "bg-buy-soft text-buy" : "bg-skip-soft text-skip")}>
            {r.ok ? <Check className="size-3" /> : <X className="size-3" />}
          </span>
          <span>
            <span className="font-medium">{r.label}</span>
            {r.detail && <span className="block text-muted-foreground">{r.detail}</span>}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

export function WhyDialog({ check, children }: { check: CheckT; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {children ? <span onClick={() => setOpen(true)}>{children}</span> : <Button variant="why" onClick={() => setOpen(true)}>Why?</Button>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl border-border bg-card sm:max-w-md">
          <DialogHeader>
            <p className="eyebrow">LUMERA thinks you should…</p>
            <DialogTitle className="flex items-center gap-3 text-2xl font-normal">
              <VerdictBadge verdict={check.verdict} /> {check.product.name}
            </DialogTitle>
            <DialogDescription>{check.headline}</DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            <Reasons items={check.reasons} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-muted p-3"><p className="eyebrow">Budget impact</p><p className="mt-1">{inr(check.product.price)} of ₹2,500</p></div>
              <div className="rounded-2xl bg-muted p-3"><p className="eyebrow">Shelf overlap</p><p className="mt-1">{check.overlap ?? "None"}</p></div>
            </div>
            <p className="text-xs text-muted-foreground">Based on your {passport.skinType.toLowerCase()} Skin Passport and current shelf. AI-generated insight, not medical advice.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProductCard({ product, meta, actions, className, onClick }: { product: Product; meta?: ReactNode; actions?: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease }}
      onClick={onClick}
      className={cn("group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift", onClick && "cursor-pointer", className)}
    >
      <div className="relative aspect-square overflow-hidden bg-ivory">
        <img src={product.image} alt={product.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-card/85 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide backdrop-blur">{product.step}</span>
      </div>
      <div className="p-4">
        <p className="eyebrow !text-[0.6rem]">{product.brand} · {product.category}</p>
        <h3 className="mt-1 text-[0.95rem] font-medium leading-snug">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm tabular-nums">{inr(product.price)}</span>
          {meta}
        </div>
        {actions && <div className="mt-3 flex gap-1.5 border-t border-border pt-3">{actions}</div>}
      </div>
    </motion.article>
  );
}

export function RoutineStep({ product, step, time, done, onToggle, index = 0, detailed }: { product: Product; step: string; time?: string; done: boolean; onToggle: () => void; index?: number; detailed?: boolean }) {
  return (
    <motion.li initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.5, ease }} className="relative flex gap-4 pl-1">
      <button
        onClick={onToggle}
        aria-pressed={done}
        aria-label={`Mark ${step} ${done ? "not done" : "done"}`}
        className={cn("relative z-10 mt-4 flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300", done ? "border-foreground bg-foreground text-background" : "border-foreground/25 bg-card hover:border-foreground/60")}
      >
        <AnimatePresence>{done && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 28 }}><Check className="size-3.5" /></motion.span>}</AnimatePresence>
      </button>
      <div className={cn("flex flex-1 gap-4 rounded-2xl border border-border bg-card p-3 transition-opacity duration-500", done && "opacity-60")}>
        <img src={product.image} alt="" loading="lazy" width={816} height={816} className="size-16 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2"><span className="eyebrow !text-[0.6rem]">{step}</span>{time && <span className="text-[0.65rem] text-muted-foreground">· {time}</span>}</div>
          <p className={cn("mt-0.5 truncate font-medium transition-all", done && "line-through decoration-foreground/30")}>{product.name}</p>
          {detailed ? (
            <div className="mt-1.5 space-y-1 text-xs text-muted-foreground">
              <p><span className="text-foreground">How:</span> {product.howTo}</p>
              <p><span className="font-serif-italic text-sm text-plum">Why this step?</span> {product.why}</p>
            </div>
          ) : (
            <p className="truncate text-xs text-muted-foreground">{product.brand}</p>
          )}
        </div>
      </div>
    </motion.li>
  );
}

export function UploadZone({ onFile, title = "Show me the product", hint = "Drop a photo or tap to choose", camera, className }: { onFile: (url: string) => void; title?: string; hint?: string; camera?: boolean; className?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const handle = (f?: File | null) => { if (f) onFile(URL.createObjectURL(f)); };
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files?.[0]); }}
      className={cn("flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-dashed border-foreground/20 bg-card/60 p-10 text-center transition-colors", drag && "border-rose bg-rose-soft/40", className)}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-ivory">{camera ? <Camera className="size-5" /> : <Upload className="size-5" />}</div>
      <div>
        <p className="text-lg">{title}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={() => input.current?.click()}>{camera ? "Take or upload a selfie" : "Choose a photo"}</Button>
      </div>
      <input ref={input} type="file" accept="image/*" capture={camera ? "user" : undefined} className="hidden" onChange={(e) => handle(e.target.files?.[0])} />
    </div>
  );
}

export function BudgetMeter({ budget, existing, added }: { budget: number; existing: number; added: number }) {
  const total = existing + added;
  const pctE = Math.min(100, (existing / budget) * 100);
  const pctA = Math.min(100 - pctE, (added / budget) * 100);
  const over = total > budget;
  return (
    <div>
      <div className="relative h-3 overflow-hidden rounded-full bg-muted">
        <motion.div className="absolute inset-y-0 left-0 bg-foreground" initial={{ width: 0 }} whileInView={{ width: `${pctE}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
        <motion.div className={cn("absolute inset-y-0", over ? "bg-skip" : "bg-rose")} initial={{ width: 0, left: 0 }} whileInView={{ width: `${pctA}%`, left: `${pctE}%` }} viewport={{ once: true }} animate={{ width: `${pctA}%`, left: `${pctE}%` }} transition={{ duration: 1.2, delay: 0.3, ease }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-foreground" />Existing</span>
        <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-rose" />Recommended</span>
        <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-muted ring-1 ring-border" />Remaining</span>
      </div>
    </div>
  );
}

export function Timeline({ items, active, onSelect }: { items: { label: string; date?: string; note: string; done?: boolean }[]; active?: number; onSelect?: (i: number) => void }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-4 md:gap-4">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto" aria-hidden />
      {items.map((it, i) => (
        <motion.li key={it.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6, ease }} className="relative pl-10 md:pl-0 md:pt-10">
          <button
            onClick={() => onSelect?.(i)}
            className={cn("absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border bg-card transition-all", it.done ? "border-foreground" : "border-dashed border-foreground/30", active === i && "ring-4 ring-rose-soft")}
            aria-label={it.label}
          >
            <span className={cn("size-2 rounded-full", it.done ? "bg-rose" : "bg-transparent")} />
          </button>
          <p className="eyebrow">{it.date}</p>
          <p className="mt-1 text-2xl font-light tracking-tight">{it.label}</p>
          <p className="mt-1 text-sm text-muted-foreground">{it.note}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export function SkinPassportCard({ className, compact, cta }: { className?: string; compact?: boolean; cta?: ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] bg-blush p-6 md:p-8", className)}>
      <p className="eyebrow">Your Skin Passport</p>
      <p className={cn("mt-3 font-light tracking-tight", compact ? "text-4xl" : "text-5xl md:text-6xl")}>{passport.skinType}</p>
      {!compact && <p className="mt-3 max-w-sm text-sm text-muted-foreground">{passport.summary}</p>}
      <p className="eyebrow mt-6">Top priorities</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {passport.priorities.map((p) => <span key={p} className="rounded-full border border-foreground/10 bg-card/70 px-3.5 py-1.5 text-sm">{p}</span>)}
      </div>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, sub, className }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>}
      <Reveal delay={0.05}><h2 className="display-lg mt-4 max-w-3xl">{title}</h2></Reveal>
      {sub && <Reveal delay={0.1}><p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">{sub}</p></Reveal>}
    </div>
  );
}

export function AppHeader({ eyebrow, title, sub, action }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display-md mt-2">{title}</h1>
        {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export const Disclaimer = ({ className }: { className?: string }) => (
  <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>LUMERA provides AI-generated beauty insights for reference and does not provide medical or dermatological advice.</p>
);
