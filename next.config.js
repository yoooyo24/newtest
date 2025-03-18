/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Remove the custom distDir configuration which is causing issues on Vercel
  // distDir: process.env.NODE_ENV === "production" ? "build" : ".next",
  
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    // This completely disables ESLint during the build process
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
