import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  async rewrites(){
    return[
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*` : 'http://127.0.0.1:8000/: path*'
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      // 2. Accepts HTTP links with any subdomain
      {
        protocol: 'http',
        hostname: '**',
       
      },
      
    ]
  }
  /* config options here */
};

export default nextConfig;
