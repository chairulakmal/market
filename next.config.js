/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.pintu.co.id/v2/trade/price-changes/:path*',
      },
    ];
  }
}

module.exports = nextConfig
