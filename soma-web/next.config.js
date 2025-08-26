/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aceternity.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'lh3.googleusercontent.com',
      'scontent-cpt1-1.xx.fbcdn.net',
    ],
  },
}

module.exports = nextConfig 