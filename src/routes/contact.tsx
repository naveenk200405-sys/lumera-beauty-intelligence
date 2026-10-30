import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/landing/chrome";
import { fieldCls } from "@/components/lumera/auth-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — LUMERA" }, { name: "description", content: "Get in touch with the LUMERA team." }, { property: "og:title", content: "Contact LUMERA" }, { property: "og:description", content: "Get in touch with the LUMERA team." }] }),
  component: Contact,
});

function Contact() {
  const [msg, setMsg] = useState("");
  return (
    <InfoPage eyebrow="Contact" title="Say hello.">
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (!msg.trim()) return; setMsg(""); toast.success("Thank you — we'll be in touch."); }}>
        <input className={fieldCls} type="email" required placeholder="Your email" aria-label="Email" />
        <textarea className={fieldCls + " h-36 py-3"} placeholder="How can we help?" aria-label="Message" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <Button size="lg">Send message</Button>
      </form>
    </InfoPage>
  );
}
