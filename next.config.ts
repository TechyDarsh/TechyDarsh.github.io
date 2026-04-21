import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Change this to match your GitHub repo name (e.g., '/portfolio-app')
  // If deploying to username.github.io (root), set basePath to ''
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['0.0.0.0', '192.168.29.143', '192.168.1.150'],
};

export default nextConfig;
