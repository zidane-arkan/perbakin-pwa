// vite.config.ts
import { defineConfig } from "file:///D:/4.PROJECT/freelance/perbakin-fe/node_modules/vite/dist/node/index.js";
import react from "file:///D:/4.PROJECT/freelance/perbakin-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///D:/4.PROJECT/freelance/perbakin-fe/node_modules/vite-plugin-pwa/dist/index.mjs";
var manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Perbakin PWA",
    short_name: "Perbakin",
    description: "Aplikasi untuk Persatuan Tembak Indonesia",
    icons: [
      {
        src: "android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#1976d2",
    background_color: "#fafafa",
    display: "standalone",
    scope: "./",
    start_url: "./",
    orientation: "portrait"
  }
};
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFw0LlBST0pFQ1RcXFxcZnJlZWxhbmNlXFxcXHBlcmJha2luLWZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFw0LlBST0pFQ1RcXFxcZnJlZWxhbmNlXFxcXHBlcmJha2luLWZlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi80LlBST0pFQ1QvZnJlZWxhbmNlL3BlcmJha2luLWZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IFZpdGVQV0EsIFZpdGVQV0FPcHRpb25zIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuXG5jb25zdCBtYW5pZmVzdEZvclBsdWdpbjogUGFydGlhbDxWaXRlUFdBT3B0aW9ucz4gPSB7XG4gIHJlZ2lzdGVyVHlwZTogXCJwcm9tcHRcIixcbiAgaW5jbHVkZUFzc2V0czogW1wiZmF2aWNvbi5pY29cIiwgXCJhcHBsZS10b3VjaC1pY29uLnBuZ1wiLCBcIm1hc2tlZC1pY29uLnN2Z1wiXSxcbiAgbWFuaWZlc3Q6IHtcbiAgICBuYW1lOiBcIlBlcmJha2luIFBXQVwiLFxuICAgIHNob3J0X25hbWU6IFwiUGVyYmFraW5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBcGxpa2FzaSB1bnR1ayBQZXJzYXR1YW4gVGVtYmFrIEluZG9uZXNpYVwiLFxuICAgIGljb25zOiBbXG4gICAgICB7XG4gICAgICAgIHNyYzogXCJhbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6IFwiYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcImFuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICB0aGVtZV9jb2xvcjogXCIjMTk3NmQyXCIsXG4gICAgYmFja2dyb3VuZF9jb2xvcjogXCIjZmFmYWZhXCIsXG4gICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG4gICAgc2NvcGU6IFwiLi9cIixcbiAgICBzdGFydF91cmw6IFwiLi9cIixcbiAgICBvcmllbnRhdGlvbjogXCJwb3J0cmFpdFwiLFxuICB9LFxufTtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgVml0ZVBXQShtYW5pZmVzdEZvclBsdWdpbildLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdTLFNBQVMsb0JBQW9CO0FBQzdULE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQStCO0FBRXhDLElBQU0sb0JBQTZDO0FBQUEsRUFDakQsY0FBYztBQUFBLEVBQ2QsZUFBZSxDQUFDLGVBQWUsd0JBQXdCLGlCQUFpQjtBQUFBLEVBQ3hFLFVBQVU7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsSUFDQSxhQUFhO0FBQUEsSUFDYixrQkFBa0I7QUFBQSxJQUNsQixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsRUFDZjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxRQUFRLGlCQUFpQixDQUFDO0FBQy9DLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
