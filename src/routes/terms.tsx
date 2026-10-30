import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/landing/chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — LUMERA" }, { name: "description", content: "Terms of use for LUMERA." }, { property: "og:title", content: "Terms — LUMERA" }, { property: "og:description", content: "Terms of use for LUMERA." }] }),
  component: () => (
    <InfoPage eyebrow="Terms" title="Terms of use">
      <p>LUMERA provides AI-generated beauty and shopping insights for informational purposes. It is not a medical or dermatological service and does not diagnose or treat any condition.</p>
      <p>Prices and product details are shown for guidance and may differ at the retailer.</p>
      <p>If you have a skin concern, please speak with a qualified professional.</p>
    </InfoPage>
  ),
});
