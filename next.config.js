/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "avatar.tobi.sh",
      "icon-library.com",
      "img.evbuc.com",
    ],
  },
  env: {
    NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
    mapbox_key:
      "pk.eyJ1IjoiaW5jcHRkIiwiYSI6ImNsOWZuOGtyZTA4Znczb2syaW1rYjlva20ifQ.i498IcTJnARrFJ8EcRoWFQ",
  },
};
module.exports = nextConfig;
