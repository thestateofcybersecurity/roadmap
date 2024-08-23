/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL + '/:path*', // API_URL should be set to your API server URL
      },
    ]
  },
}

module.exports = nextConfig
