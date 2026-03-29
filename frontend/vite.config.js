import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      includeAssets: ["logo.svg"],
      manifest: {
        id: '/',
        name: "ATTSYS 2.0: Automated Attendance",
        short_name: "ATTSYS 2.0",
        description: "Next-gen automated attendance tracking ecosystem.",
        theme_color: "#000000",
        background_color: "#000000",
        scope: '/',
        start_url: '/',
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "logo.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "logo.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
