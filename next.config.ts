import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images:{
      // domains:["lh3.googleusercontent.com"]
      remotePatterns:[{
        protocol:"https",
        hostname: "*",
        port: '',
        pathname:"/**"
      }]
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    typescript: {
      
     ignoreBuildErrors: true,
    },
};

export default nextConfig;
