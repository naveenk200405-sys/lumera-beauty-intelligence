import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/youcam/status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { scanStatus } = await import("@/lib/youcam.server");
        const id = new URL(request.url).searchParams.get("taskId") ?? "";
        try {
          return Response.json(await scanStatus(id));
        } catch {
          return Response.json({ status: "error" }, { status: 502 });
        }
      },
    },
  },
});
