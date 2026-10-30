import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthLayout, GoogleButton, fieldCls } from "@/components/lumera/auth-layout";
import { setState } from "@/lib/store";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — LUMERA" }, { name: "description", content: "Your beauty profile starts here." }, { property: "og:title", content: "Join LUMERA" }, { property: "og:description", content: "Your beauty profile starts here." }] }),
  component: Signup,
});

const goals = ["Hydration", "Clearer texture", "Oil balance", "Glow", "Simplify my routine"];

function Signup() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", pw: "" });
  const [goal, setGoal] = useState<string>();
  const done = (name: string, email: string) => { setState(() => ({ user: { name, email, goal } })); toast.success("Your beauty profile starts now."); nav({ to: "/app/scan" }); };
  return (
    <AuthLayout title={<>Your beauty profile <span className="font-serif-italic">starts here.</span></>}>
      <GoogleButton onClick={() => done("Aanya", "aanya@example.com")} />
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (!f.name || !f.email.includes("@") || f.pw.length < 6) return toast.error("Add your name, email and a 6+ character password."); done(f.name, f.email); }}>
        <input className={fieldCls} placeholder="Name" aria-label="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input className={fieldCls} type="email" placeholder="Email" aria-label="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <input className={fieldCls} type="password" placeholder="Password" aria-label="Password" value={f.pw} onChange={(e) => setF({ ...f, pw: e.target.value })} />
        <p className="eyebrow pt-3">Beauty goal <span className="normal-case tracking-normal">(optional)</span></p>
        <div className="flex flex-wrap gap-2">
          {goals.map((g) => <button type="button" key={g} onClick={() => setGoal(goal === g ? undefined : g)} className={cn("rounded-full border px-3.5 py-1.5 text-xs transition", goal === g ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/40")}>{g}</button>)}
        </div>
        <Button size="lg" className="mt-3 w-full">Create account</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">Already have one? <Link to="/login" className="text-foreground underline underline-offset-4">Log in</Link></p>
    </AuthLayout>
  );
}
