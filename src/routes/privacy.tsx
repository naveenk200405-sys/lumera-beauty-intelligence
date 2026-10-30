import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/landing/chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — LUMERA" }, { name: "description", content: "How LUMERA handles your photos and beauty data." }, { property: "og:title", content: "Privacy — LUMERA" }, { property: "og:description", content: "Your face is personal. Your data should be too." }] }),
  component: () => (
    <InfoPage eyebrow="Privacy" title={<>Your face is personal. <span className="font-serif-italic">Your data should be too.</span></>}>
      <p>Selfies are used only to create your Skin Passport. Analysis requests are made from our servers, so service keys never reach your browser.</p>
      <p>You choose what to share. Camera access is requested only when you start a scan, and you can upload a photo instead.</p>
      <p>You can delete your scans, shelf and routine at any time from Settings → Data.</p>
      <p>In demo mode, everything stays on your device and no photos are sent anywhere.</p>
    </InfoPage>
  ),
});
