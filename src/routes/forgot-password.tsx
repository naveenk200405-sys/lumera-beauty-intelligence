import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthLayout, fieldCls } from "@/components/lumera/auth-layout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — LUMERA" }, { name: "description", content: "Reset your LUMERA password." }, { property: "og:title", content: "Reset password — LUMERA" }, { property: "og:description", content: "Reset your LUMERA password." }] }),
  component: Forgot,
});

function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout title={sent ? "Check your inbox." : "Forgot your password?"} sub={sent ? `If ${email} has an account, a reset link is on its way.` : "We'll send you a link to set a new one."}>
      {!sent ? (
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setSent(true); }}>
          <input className={fieldCls} type="email" required placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button size="lg" className="w-full">Send reset link</Button>
        </form>
      ) : (
        <Button variant="outline" size="lg" className="w-full" onClick={() => setSent(false)}>Use a different email</Button>
      )}
      <p className="mt-6 text-center text-sm"><Link to="/login" className="text-muted-foreground hover:text-foreground">← Back to log in</Link></p>
    </AuthLayout>
  );
}
