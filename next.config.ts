import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
      protocol: 'https',
      hostname: '*',
    },
    {
      protocol: 'http',
      hostname: '*',
    },
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ]
  }
};

export default nextConfig;
