import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthLayout, GoogleButton, fieldCls } from "@/components/lumera/auth-layout";
import { setState } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — LUMERA" }, { name: "description", content: "Welcome back to LUMERA." }, { property: "og:title", content: "Log in — LUMERA" }, { property: "og:description", content: "Welcome back to LUMERA." }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const go = (name: string, mail: string) => {
    setBusy(true);
    setTimeout(() => { setState(() => ({ user: { name, email: mail } })); toast.success(`Welcome back, ${name}.`); nav({ to: "/app" }); }, 600);
  };
  return (
    <AuthLayout title="Welcome back." sub="Your Skin Passport is waiting.">
      <GoogleButton onClick={() => go("Aanya", "aanya@example.com")} />
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (!email.includes("@") || pw.length < 6) return toast.error("Check your email and a password of 6+ characters."); go(email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()), email); }}>
        <input className={fieldCls} type="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={fieldCls} type="password" placeholder="Password" aria-label="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
        <div className="flex justify-end"><Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</Link></div>
        <Button size="lg" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Log in"}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">New to LUMERA? <Link to="/signup" className="text-foreground underline underline-offset-4">Create an account</Link></p>
    </AuthLayout>
  );
}
