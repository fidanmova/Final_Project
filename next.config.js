/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "avatar.tobi.sh", "icon-library.com"],
  },
};

module.exports = nextConfig;
