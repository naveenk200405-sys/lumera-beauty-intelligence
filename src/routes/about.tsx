import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/landing/chrome";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — LUMERA" }, { name: "description", content: "Why LUMERA exists: fewer, better beauty decisions." }, { property: "og:title", content: "About LUMERA" }, { property: "og:description", content: "Fewer, better beauty decisions." }] }),
  component: () => (
    <InfoPage eyebrow="About" title={<>We help you buy <span className="font-serif-italic">less, and better.</span></>}>
      <p>LUMERA began with a simple frustration: beauty shelves full of products bought on a hunch. Thousands of options, hundreds of opinions — and no one asking what you already own.</p>
      <p>We combine visual skin intelligence from YouCam with our own decision layer that looks at your goals, your shelf and your budget. Then we tell you, honestly: buy it, think about it, or skip it.</p>
      <p>Sometimes the best recommendation is to keep your money.</p>
      <Button size="lg" asChild className="mt-4"><Link to="/signup">Analyze my skin</Link></Button>
    </InfoPage>
  ),
});
