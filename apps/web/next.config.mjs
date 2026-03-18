/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.cafef.vn" },
      { protocol: "https", hostname: "**.vneconomy.vn" },
      { protocol: "https", hostname: "**.vnexpress.net" },
      { protocol: "https", hostname: "i.cafef.vn" },
      { protocol: "https", hostname: "vneconomy.mediacdn.vn" },
      { protocol: "https", hostname: "vcdn.vnexpress.net" },
    ],
  },
}

export default nextConfig
