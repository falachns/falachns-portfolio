import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@hugeicons/core-free-icons", "@hugeicons/react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/qiscus-helpdesk-csat",
        destination: "/work/qiscus-csat",
        permanent: true,
      },
      {
        source: "/habitz",
        destination: "/work/habitz",
        permanent: true,
      },
      {
        source: "/artverse",
        destination: "/work/artverse",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
