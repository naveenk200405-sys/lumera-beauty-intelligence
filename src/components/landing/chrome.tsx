import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo, Page } from "@/components/lumera/kit";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    { href: "/#how", label: "How it works" },
    { href: "/#features", label: "Features" },
  ];
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "glass border-b border-border/70" : "bg-transparent")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-9 text-sm text-foreground/75 md:flex">
          {links.map((l) => <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">{l.label}</a>)}
          <Link to="/about" className="transition-colors hover:text-foreground">About</Link>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild><Link to="/login">Log in</Link></Button>
          <Button asChild><Link to="/signup">Analyze my skin</Link></Button>
        </div>
        <button className="flex size-10 items-center justify-center md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glass overflow-hidden border-b border-border md:hidden">
            <div className="flex flex-col gap-1 px-5 pb-6">
              {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-lg">{l.label}</a>)}
              <Link to="/about" className="py-3 text-lg">About</Link>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="outline" size="lg" asChild><Link to="/login">Log in</Link></Button>
                <Button size="lg" asChild><Link to="/signup">Analyze my skin</Link></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">Personal Beauty Intelligence</p>
          <p className="mt-8 font-serif-italic text-3xl">Buy less. Buy better.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Link to="/app" className="hover:text-rose">Product</Link>
          <a href="/#how" className="hover:text-rose">How it works</a>
          <Link to="/about" className="hover:text-rose">About</Link>
          <Link to="/privacy" className="hover:text-rose">Privacy</Link>
          <Link to="/terms" className="hover:text-rose">Terms</Link>
          <Link to="/contact" className="hover:text-rose">Contact</Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-border px-5 py-6 text-xs text-muted-foreground md:px-8">
        <p>LUMERA provides AI-generated beauty and shopping insights for informational purposes and is not a medical or dermatological service.</p>
        <p className="mt-2">© 2026 LUMERA</p>
      </div>
    </footer>
  );
}

export function InfoPage({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Page className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:pt-44">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-4">{title}</h1>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/80">{children}</div>
      </Page>
      <Footer />
    </div>
  );
}
