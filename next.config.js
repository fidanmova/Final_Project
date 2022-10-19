/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "avatar.tobi.sh", "icon-library.com","img.evbuc.com"],
  },
};

module.exports = nextConfig;