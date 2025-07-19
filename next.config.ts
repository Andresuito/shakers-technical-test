import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['logo.clearbit.com']
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/backend/**']
    };
    return config;
  },
};

export default nextConfig;