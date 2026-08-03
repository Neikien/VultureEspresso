/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "digital.ihg.com",
      },
      {
        protocol: "https",
        hostname: "www.angsana.com",
      },
      {
        protocol: "https",
        hostname: "phuquoc.regenthotels.com",
      },
      {
        protocol: "https",
        hostname: "tse4.mm.bing.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      // --- THÊM DOMAIN CLOUDINARY VÀO ĐÂY ---
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;