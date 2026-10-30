import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Lock, ShieldCheck, Trash2, Eye, ScanFace, BookUser, Archive, Search, Scale, Wallet, Sun, LineChart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Navbar, Footer } from "@/components/landing/chrome";
import { Reveal, SectionTitle, MatchScore, VerdictBadge, CountUp, BudgetMeter, Disclaimer, ease } from "@/components/lumera/kit";
import { byId, inr, looks, occasions, routine, journey, type Occasion } from "@/lib/data";
import hero from "@/assets/hero.jpg";
import shelf from "@/assets/shelf.jpg";
import look from "@/assets/look.jpg";
import serum from "@/assets/serum.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMERA — Before you buy beauty, ask LUMERA." },
      { name: "description", content: "Understand your skin, check the products you own, and build a routine around your goals and budget." },
      { property: "og:title", content: "LUMERA — Personal Beauty Intelligence" },
      { property: "og:description", content: "Know your skin. Know what to buy." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <BeforeYouBuy />
      <Verdicts />
      <Shelf />
      <Budget />
      <Daily />
      <Journey />
      <CompleteLook />
      <Features />
      <Trust />
      <Privacy />
      <FinalCta />
      <Footer />
    </div>
  );
}

const wrap = "mx-auto max-w-7xl px-5 md:px-8";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  return (
    <section ref={ref} className="relative pt-24 md:pt-28">
      <div className={cn(wrap, "grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24")}>
        <div className="order-2 lg:order-1">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow">Personal Beauty Intelligence</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease }} className="display-xl mt-6">
            Before you buy beauty, <span className="font-serif-italic text-plum">ask LUMERA.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease }} className="mt-7 max-w-md text-lg text-muted-foreground">
            Understand your skin. Check the products you already own. Build a beauty routine around your goals and budget.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="mt-9 flex flex-wrap gap-3">
            <Button size="xl" asChild><Link to="/signup">Analyze my skin <ArrowRight /></Link></Button>
            <Button size="xl" variant="outline" asChild><a href="#how">See how it works</a></Button>
          </motion.div>
          <p className="mt-10 text-xs text-muted-foreground">Visual skin intelligence powered by YouCam.</p>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-ivory">
            <motion.img style={{ y, scale }} src={hero} alt="Woman studying her skin in a round mirror" width={1280} height={1600} className="h-full w-full object-cover" />
          </div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }} className="glass absolute -left-3 bottom-24 w-52 rounded-3xl border border-card/60 p-5 shadow-lift md:-left-10 md:w-60">
            <p className="eyebrow !text-[0.58rem]">Skin Passport</p>
            <p className="mt-1.5 text-2xl font-light tracking-tight">Combination</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.8, ease }} className="glass absolute -right-2 top-10 w-48 rounded-3xl border border-card/60 p-5 shadow-lift md:-right-8 md:w-56">
            <p className="eyebrow !text-[0.58rem]">Top priorities</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {["Hydration", "Texture", "Oil balance"].map((p, i) => <li key={p} className="flex items-center justify-between"><span>{p}</span><span className="text-xs text-muted-foreground">0{i + 1}</span></li>)}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="border-y border-border bg-card py-24 md:py-36">
      <div className={cn(wrap, "grid gap-14 md:grid-cols-2")}>
        <Reveal><h2 className="display-lg">Beauty shopping shouldn't feel like <span className="font-serif-italic">guesswork.</span></h2></Reveal>
        <div className="space-y-2 text-2xl font-light md:text-3xl">
          {["Thousands of products.", "Hundreds of opinions.", "One question:"].map((t, i) => <Reveal key={t} delay={i * 0.1}><p className="text-muted-foreground">{t}</p></Reveal>)}
          <Reveal delay={0.35}><p className="pt-2 font-serif-italic text-4xl text-foreground md:text-5xl">“What actually makes sense for me?”</p></Reveal>
          <Reveal delay={0.5}><p className="pt-10 text-base font-normal">LUMERA makes the decision personal.</p></Reveal>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", t: "Scan", d: "Take a selfie. LUMERA uses visual intelligence to understand your skin profile." },
  { n: "02", t: "Understand", d: "Create your personal Skin Passport." },
  { n: "03", t: "Check", d: "Upload a product and ask: Should I buy this?" },
  { n: "04", t: "Decide", d: "LUMERA gives you a clear BUY, THINK or SKIP." },
  { n: "05", t: "Build", d: "Build a routine around your existing products and budget." },
  { n: "06", t: "Shop", d: "Visualize your complete beauty look." },
];

function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="how" className="scroll-mt-20 py-24 md:py-36">
      <div className={wrap}>
        <SectionTitle eyebrow="How it works" title={<>Six quiet steps from <span className="font-serif-italic">selfie to shelf.</span></>} />
        <div ref={ref} className="relative mt-16 md:mt-24">
          <div className="absolute left-[7px] top-0 h-full w-px bg-border md:left-1/2" />
          <motion.div style={{ height: h }} className="absolute left-[7px] top-0 w-px bg-rose md:left-1/2" />
          <div className="space-y-14 md:space-y-24">
            {steps.map((s, i) => (
              <Reveal key={s.n} className={cn("relative grid pl-10 md:grid-cols-2 md:pl-0", i % 2 && "md:[&>div]:col-start-2")}>
                <span className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-rose bg-background md:left-1/2 md:-translate-x-[7px]" />
                <div className={cn("md:px-16", i % 2 ? "" : "md:text-right")}>
                  <p className="font-serif-italic text-2xl text-rose">{s.n}</p>
                  <h3 className="mt-1 text-3xl font-light tracking-tight md:text-4xl">{s.t}</h3>
                  <p className={cn("mt-3 max-w-sm text-muted-foreground", i % 2 ? "" : "md:ml-auto")}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeYouBuy() {
  const [revealed, setRevealed] = useState(false);
  const reasons = ["Fits your current goal", "Works with your routine", "Within your budget", "No unnecessary duplication"];
  return (
    <section className="bg-ink-grad py-24 text-ink-foreground md:py-36">
      <div className={cn(wrap, "grid items-center gap-14 lg:grid-cols-2")}>
        <div>
          <Reveal><p className="eyebrow !text-ink-foreground/60">The hero feature</p></Reveal>
          <Reveal delay={0.05}><h2 className="display-lg mt-4">Before you buy it, <span className="font-serif-italic text-champagne">ask LUMERA.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-md text-ink-foreground/70">Show LUMERA any product. It weighs your skin, your goals, your shelf and your budget — and explains its answer.</p></Reveal>
          <Reveal delay={0.15}><Button variant="light" size="lg" className="mt-8" asChild><Link to="/app/product-check">Check a product</Link></Button></Reveal>
        </div>
        <Reveal>
          <div className="grid overflow-hidden rounded-[2rem] bg-card text-card-foreground shadow-lift sm:grid-cols-2">
            <div className="relative bg-ivory">
              <img src={serum} alt="Daily Barrier Serum" loading="lazy" width={1024} height={1024} className="aspect-square h-full w-full object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/90 p-4 backdrop-blur">
                <p className="text-sm font-medium">Daily Barrier Serum</p>
                <p className="text-sm text-muted-foreground">₹699</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 p-7">
              <MatchScore value={87} size={150} />
              <p className="eyebrow !text-buy">Strong match</p>
              <AnimatePresence mode="wait">
                {!revealed ? (
                  <motion.div key="a" exit={{ opacity: 0, y: -8 }} className="w-full space-y-2">
                    {reasons.map((r) => <p key={r} className="flex items-center gap-2 text-sm"><Check className="size-4 text-buy" />{r}</p>)}
                    <Button variant="why" className="mt-3 w-full" onClick={() => setRevealed(true)}>Why?</Button>
                  </motion.div>
                ) : (
                  <motion.div key="b" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }} className="flex w-full flex-col items-center gap-4 text-center">
                    <VerdictBadge verdict="BUY" size="lg" />
                    <p className="text-sm text-muted-foreground">Your scan shows hydration as the top priority, and nothing on your shelf fills the serum step yet. It leaves ₹0 over your ₹2,500 plan.</p>
                    <button className="text-xs text-muted-foreground underline" onClick={() => setRevealed(false)}>Back</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Verdicts() {
  const cards = [
    { v: "BUY" as const, t: "A strong match for your current routine.", d: "Fills a real gap, fits your skin and your budget.", c: "bg-buy-soft" },
    { v: "THINK" as const, t: "Potentially useful, but not essential right now.", d: "Worth saving for later — LUMERA will remind you.", c: "bg-think-soft" },
    { v: "SKIP" as const, t: "You already have something similar. Save your money.", d: "Our favourite answer. Buy less, buy better.", c: "bg-skip-soft" },
  ];
  return (
    <section className="py-24 md:py-36">
      <div className={wrap}>
        <SectionTitle eyebrow="Buy · Think · Skip" title={<>Honest answers. <span className="font-serif-italic">Even when it's no.</span></>} sub="LUMERA isn't paid to push products. Its job is to help you decide." />
        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {cards.map((c, i) => (
            <Reveal key={c.v} delay={i * 0.1} className="w-[82%] shrink-0 snap-center md:w-auto">
              <div className={cn("flex h-full min-h-[22rem] flex-col justify-between rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-1", c.c, c.v === "SKIP" && "ring-1 ring-skip/30")}>
                <div className="flex items-center justify-between"><VerdictBadge verdict={c.v} />{c.v === "SKIP" && <span className="eyebrow !text-skip">Our difference</span>}</div>
                <div>
                  <p className="text-2xl font-light leading-snug tracking-tight md:text-[1.75rem]">{c.t}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Shelf() {
  return (
    <section className="bg-card py-24 md:py-36">
      <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]")}>
        <Reveal><div className="overflow-hidden rounded-[2rem]"><motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 1.2, ease }} src={shelf} alt="Skincare products on a stone shelf" loading="lazy" width={1600} height={1008} className="w-full object-cover" /></div></Reveal>
        <div>
          <SectionTitle eyebrow="My Shelf" title={<>Start with what you <span className="font-serif-italic">already own.</span></>} sub="LUMERA understands the products already in your routine before recommending something new." />
          <Reveal delay={0.2}><Button size="lg" className="mt-8" asChild><Link to="/app/shelf">Build my shelf</Link></Button></Reveal>
        </div>
      </div>
    </section>
  );
}

function Budget() {
  return (
    <section className="py-24 md:py-36">
      <div className={cn(wrap, "grid items-center gap-14 lg:grid-cols-2")}>
        <SectionTitle eyebrow="Budget" title={<>A better routine doesn't need a <span className="font-serif-italic">bigger budget.</span></>} />
        <Reveal>
          <div className="surface p-8 md:p-10">
            <p className="eyebrow">₹2,500 budget</p>
            <div className="mt-8 space-y-4 text-lg">
              <div className="flex justify-between"><span className="text-muted-foreground">Existing products</span><CountUp to={1801} prefix="₹" /></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Recommended additions</span><CountUp to={699} prefix="₹" /></div>
              <div className="flex justify-between border-t border-border pt-4 text-2xl"><span>Total</span><CountUp to={2500} prefix="₹" className="font-medium" /></div>
            </div>
            <div className="mt-8"><BudgetMeter budget={2500} existing={1801} added={699} /></div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="font-serif-italic text-2xl">Routine complete.</p>
              <Button asChild><Link to="/app/budget">Build my routine</Link></Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Daily() {
  const [done, setDone] = useState<Record<string, boolean>>({ am1: true });
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className={wrap}>
        <SectionTitle eyebrow="Daily routine" title={<>Morning and night, <span className="font-serif-italic">made simple.</span></>} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {(["am", "pm"] as const).map((k, ki) => (
            <Reveal key={k} delay={ki * 0.1}>
              <div className="surface p-6 md:p-8">
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-light">{k === "am" ? "Morning" : "Night"}</p>
                  <p className="tabular-nums text-muted-foreground">{routine[k].time}</p>
                </div>
                <ul className="mt-6 divide-y divide-border">
                  {routine[k].steps.map((s) => {
                    const p = byId(s.pid);
                    const d = !!done[s.id];
                    return (
                      <li key={s.id}>
                        <button onClick={() => setDone({ ...done, [s.id]: !d })} className="flex w-full items-center gap-4 py-3 text-left" aria-pressed={d}>
                          <img src={p.image} alt="" loading="lazy" width={816} height={816} className="size-12 rounded-xl object-cover" />
                          <span className="flex-1"><span className={cn("block transition", d && "text-muted-foreground line-through")}>{s.step}</span><span className="text-xs text-muted-foreground">{p.name}</span></span>
                          <motion.span animate={{ scale: d ? [1, 1.2, 1] : 1 }} className={cn("flex size-6 items-center justify-center rounded-full border transition-colors", d ? "border-foreground bg-foreground text-background" : "border-foreground/25")}>{d && <Check className="size-3.5" />}</motion.span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="py-24 md:py-36">
      <div className={wrap}>
        <SectionTitle eyebrow="Skin journey" title={<>Your routine is a <span className="font-serif-italic">journey.</span></>} sub="Check in over time and see how your observed profile trends — as information, not a promise." />
        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {journey.map((j, i) => (
            <Reveal key={j.day} delay={i * 0.1}>
              <div className="h-full border-t border-foreground/80 pt-6">
                <p className="text-4xl font-light tracking-tight">DAY {j.day}</p>
                <p className="mt-3 text-sm text-muted-foreground">{j.note}</p>
                {j.hydration > 0 && (
                  <div className="mt-5 space-y-2">
                    {[["Hydration", j.hydration], ["Texture", j.texture]].map(([l, v]) => (
                      <div key={l as string}>
                        <div className="flex justify-between text-xs"><span>{l}</span><span className="text-muted-foreground">{v}</span></div>
                        <div className="mt-1 h-1 rounded-full bg-muted"><motion.div className="h-full rounded-full bg-rose" initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 0.2 + i * 0.1 }} /></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Disclaimer className="mt-12" />
      </div>
    </section>
  );
}

function CompleteLook() {
  const [occ, setOcc] = useState<Occasion>("Date");
  const L = looks[occ];
  const rows = [["Skin routine", L.skin], ["Beauty", L.beauty], ["Hair", L.hair], ["Outfit", L.outfit]] as const;
  const total = L.skin + L.beauty + L.hair + L.outfit;
  return (
    <section className="bg-ink-grad py-24 text-ink-foreground md:py-36">
      <div className={wrap}>
        <Reveal><p className="eyebrow !text-ink-foreground/60">Complete look</p></Reveal>
        <Reveal delay={0.05}><h2 className="display-lg mt-4 max-w-3xl">From skin to your <span className="font-serif-italic text-champagne">complete look.</span></h2></Reveal>
        <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {occasions.map((o) => (
            <button key={o} onClick={() => setOcc(o)} className={cn("shrink-0 rounded-full border px-5 py-2.5 text-sm transition-all", occ === o ? "border-ink-foreground bg-ink-foreground text-ink" : "border-ink-foreground/25 hover:border-ink-foreground/60")}>{o}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-auto lg:min-h-[36rem]">
            <AnimatePresence mode="wait">
              <motion.img key={occ} src={look} alt={`${occ} look visualization`} loading="lazy" width={1200} height={1504}
                initial={{ opacity: 0, scale: 1.06, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0 }}
                transition={{ duration: 1, ease }} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-ink/60 p-4 backdrop-blur-md">
              <p className="eyebrow !text-ink-foreground/60">{occ}</p>
              <p className="mt-1 font-serif-italic text-xl">{L.mood}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[2rem] bg-card p-8 text-card-foreground">
            <div>
              <p className="eyebrow">Your look</p>
              <div className="mt-6 divide-y divide-border">
                {rows.map(([k, v]) => (
                  <motion.div key={occ + k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between py-4 text-lg"><span>{k}</span><span className="tabular-nums text-muted-foreground">{inr(v)}</span></motion.div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between border-t border-foreground pt-5"><span className="eyebrow !text-foreground">Total</span><span className="text-4xl font-light tabular-nums">{inr(total)}</span></div>
              <Button size="xl" className="mt-6 w-full" asChild><Link to="/app/look">Shop this look</Link></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { i: ScanFace, t: "Skin Passport", d: "A living profile of your skin type, observed characteristics and top priorities." },
  { i: Archive, t: "My Shelf", d: "Everything you already own, mapped to the routine step it serves." },
  { i: Search, t: "Product Check", d: "Show LUMERA a product and get a personal LUMERA MATCH score." },
  { i: Scale, t: "Buy / Think / Skip", d: "A clear verdict — including the courage to say skip." },
  { i: Wallet, t: "Budget Planner", d: "Complete your routine within the budget you set." },
  { i: Sun, t: "Daily Routine", d: "AM and PM steps with gentle check-offs." },
  { i: LineChart, t: "Skin Journey", d: "Check-ins that show observed trends over time." },
  { i: Sparkles, t: "Complete Look", d: "Visualize skin, beauty, hair and outfit for any occasion." },
];

function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24 md:py-36">
      <div className={wrap}>
        <SectionTitle eyebrow="Features" title={<>Everything you need. <span className="font-serif-italic">Nothing you don't.</span></>} />
        <div className="no-scrollbar -mx-5 mt-14 flex snap-x gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={(i % 4) * 0.06} className="w-[70%] shrink-0 snap-start sm:w-auto">
              <div className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-start justify-between"><f.i className="size-5 text-rose" strokeWidth={1.5} /><span className="font-serif-italic text-muted-foreground">0{i + 1}</span></div>
                <div>
                  <h3 className="text-xl font-light tracking-tight">{f.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground transition-all duration-500 md:max-h-0 md:translate-y-2 md:opacity-0 md:group-hover:max-h-24 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">{f.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = ["Why it was selected", "How it fits your goal", "How it fits your routine", "Budget impact", "Existing product overlap"];
  return (
    <section className="bg-card py-24 md:py-36">
      <div className={cn(wrap, "grid gap-14 lg:grid-cols-2")}>
        <SectionTitle eyebrow="Trust" title={<>Intelligence you can <span className="font-serif-italic">understand.</span></>} sub="Every recommendation comes with its reasoning. Look for one word throughout LUMERA:" />
        <div>
          <Reveal><span className="inline-block rounded-full border border-rose/30 bg-rose-soft/50 px-8 py-4 font-serif-italic text-5xl text-plum">Why?</span></Reveal>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {items.map((t, i) => <Reveal key={t} delay={i * 0.06}><li className="flex items-center justify-between py-5 text-lg"><span>{t}</span><span className="font-serif-italic text-muted-foreground">0{i + 1}</span></li></Reveal>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const items = [
    { i: Lock, t: "Secure processing", d: "Analysis runs through our servers — service keys never touch your browser." },
    { i: Eye, t: "Clear permissions", d: "Camera access only when you start a scan. Upload instead anytime." },
    { i: Trash2, t: "Delete your data", d: "Remove scans, shelf and routine in one tap from Settings." },
    { i: ShieldCheck, t: "Transparent AI usage", d: "We tell you what's AI-generated and what it's based on." },
  ];
  return (
    <section className="py-24 md:py-36">
      <div className={wrap}>
        <SectionTitle eyebrow="Privacy" title={<>Your face is personal. <span className="font-serif-italic">Your data should be too.</span></>} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.06} className="bg-background p-8">
              <it.i className="size-5 text-rose" strokeWidth={1.5} />
              <h3 className="mt-8 text-lg">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-24 md:px-8">
      <div className="bg-blush mx-auto max-w-7xl rounded-[2.5rem] px-6 py-24 text-center md:py-36">
        <Reveal><p className="eyebrow">Ready to shop smarter?</p></Reveal>
        <Reveal delay={0.05}><h2 className="display-xl mx-auto mt-6 max-w-4xl">Before you buy beauty, <span className="font-serif-italic text-plum">ask LUMERA.</span></h2></Reveal>
        <Reveal delay={0.15}><Button size="xl" className="mt-10" asChild><Link to="/signup">Analyze my skin <ArrowRight /></Link></Button></Reveal>
      </div>
    </section>
  );
}

// Re-export for lint satisfaction of unused icon
export const _unused = BookUser;
