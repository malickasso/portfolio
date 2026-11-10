import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Développement uniquement : autorise l'accès depuis le réseau local (ex. téléphone)
  allowedDevOrigins: ["192.168.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
