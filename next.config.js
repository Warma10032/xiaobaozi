/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },

  async headers() {
    return [
      {
        // Files in /public are served with `must-revalidate` by default, so
        // Cloudflare revalidates them against Vercel on every single request.
        // That edge-to-origin round trip is the slowest leg of the site, so
        // pin them to a long TTL and let the edge serve them directly.
        source: '/:all*(webp|png|jpg|jpeg|gif|svg|ico|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // The API routes are already revalidated hourly on Vercel. Caching
        // them at the edge too keeps the slow origin round trip off the
        // critical path for repeat visitors.
        source: '/api/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=600',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
