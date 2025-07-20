import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['logo.clearbit.com'],
    unoptimized: true,
  },
    turbopack: {
      rules: {
        '**backend/**': ['ignore']
    }
  }
};

export default nextConfig;