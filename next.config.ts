import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
    ],
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
