import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start bundled server entry to src/server.ts (SSR error wrapper)
    server: { entry: "server" },
  },
});
