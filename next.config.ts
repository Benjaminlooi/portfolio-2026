/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO: Disable trailing slashes for clean URLs
  trailingSlash: false,
  
  // SEO: Generate static pages at build time for better performance
  output: 'standalone',
  
  // SEint: Optimize images with proper caching
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "letsenhance.io",
      },
      {
        hostname: "firebase.google.com",
      },
      {
        hostname: "media2.dev.to",
      },
      {
        hostname: "github.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "camo.githubusercontent.com",
      },
      {
        hostname: "raw.githubusercontent.com",
      },
      {
        hostname: "images.pexels.com",
      },
    ],
  },
  
  // SEO: Add custom headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/feed.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.node/,
      use: "node-loader",
    });

    return config;
  },
  
  // Turbopack configuration (Next.js 16+)
  turbopack: {},
};

export default nextConfig;
