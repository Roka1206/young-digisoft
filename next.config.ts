import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "young-digisoft.vercel.app" }],
        destination: "https://youngdigisoft.es/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
