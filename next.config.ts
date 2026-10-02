import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: '/freelance', destination: '/', permanent: true }];
  },
};

export default nextConfig;
