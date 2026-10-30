import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/youcam/scan")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { startScan } = await import("@/lib/youcam.server");
        try {
          const body = (await request.json().catch(() => ({}))) as { image?: string };
          return Response.json(await startScan(body.image ?? ""));
        } catch {
          return Response.json({ error: "Something went wrong. Let's try that again." }, { status: 502 });
        }
      },
    },
  },
});
