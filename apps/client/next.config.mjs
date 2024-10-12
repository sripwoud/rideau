/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/web-worker/ },
    ]
    return config
  },
}

export default nextConfig
