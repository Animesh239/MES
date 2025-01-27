import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "picsum.photos"],
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
