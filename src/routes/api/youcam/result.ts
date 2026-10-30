import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/youcam/result")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { scanResult } = await import("@/lib/youcam.server");
        const id = new URL(request.url).searchParams.get("taskId") ?? "";
        try {
          return Response.json(await scanResult(id));
        } catch {
          return Response.json({ error: "Something went wrong. Let's try that again." }, { status: 502 });
        }
      },
    },
  },
});
