import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/minare/:path*",
        destination: "/minare/:path*",
      },
    ];
  },
};

export default nextConfig;
