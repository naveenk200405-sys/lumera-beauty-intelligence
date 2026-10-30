import type { ReactNode } from "react";
import { motion } from "framer-motion";
import hero from "@/assets/hero.jpg";
import { Logo, ease } from "./kit";

export function AuthLayout({ title, sub, children }: { title: ReactNode; sub?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <motion.img src={hero} alt="Woman checking her skin in a mirror" width={1280} height={1600} className="absolute inset-0 h-full w-full object-cover" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute inset-x-12 bottom-12 text-ink-foreground">
          <p className="eyebrow !text-ink-foreground/70">Personal Beauty Intelligence</p>
          <p className="display-md mt-4 max-w-md">Know your skin. <span className="font-serif-italic">Know what to buy.</span></p>
        </div>
      </div>
      <div className="flex flex-col px-6 py-8 md:px-16">
        <Logo />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="display-md">{title}</h1>
          {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
          <div className="mt-8">{children}</div>
        </motion.div>
        <p className="text-center text-xs text-muted-foreground">Demo mode — your details stay on this device.</p>
      </div>
    </div>
  );
}

export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-foreground/15 bg-card text-sm font-medium transition-colors hover:border-foreground/30">
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden><path fill="currentColor" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3ZM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22ZM6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14ZM12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 5.9 12 5.9Z" /></svg>
      Continue with Google
    </button>
  );
}

export const fieldCls = "h-12 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none transition focus:border-rose focus:ring-4 focus:ring-rose-soft";
