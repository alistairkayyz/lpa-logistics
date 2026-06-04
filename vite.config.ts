import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Run Lightning CSS in dev and build so the preview matches the built output.
  css: { transformer: "lightningcss" },
  resolve: {
    // Honor the `@/*` mapping from tsconfig.json natively (Vite 8+).
    tsconfigPaths: true,
    alias: {
      "@": `${process.cwd()}/src`,
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
      // Stop client bundles from importing server-only modules.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    // Build the SSR app into Vercel's Build Output API format (.vercel/output),
    // which Vercel auto-detects. Only needed at build time. Security headers are
    // baked into the output here (vercel.json routing/headers are ignored once a
    // Build Output API directory exists).
    ...(command === "build"
      ? [
          nitro({
            preset: process.env.NITRO_PRESET || "vercel",
            routeRules: {
              "/**": {
                headers: {
                  "X-Frame-Options": "SAMEORIGIN",
                  "X-Content-Type-Options": "nosniff",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "Permissions-Policy": "camera=(), microphone=()",
                },
              },
            },
          }),
        ]
      : []),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
}));
