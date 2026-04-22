import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/service-api/:path*',
        destination: 'https://ndis-service-api-1018-hwbmbecqd7cdd7d3.australiaeast-01.azurewebsites.net/api/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://ndis-user-api-1018-b6eje9h7cxhcc7bz.australiaeast-01.azurewebsites.net/api/:path*',
      },
    ];
  },
};

export default nextConfig;
