/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "res.cloudinary.com",
            "avatar.tobi.sh",
            "icon-library.com",
            "img.evbuc.com",
            "loremflickr.com",
            "github.com",
            "placeimg.com",
        ],
    },
    env: {
        NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN:
            process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
        mapbox_key:
            "pk.eyJ1IjoiaW5jcHRkIiwiYSI6ImNsOWZuOGtyZTA4Znczb2syaW1rYjlva20ifQ.i498IcTJnARrFJ8EcRoWFQ",
        STRIPE_PUBLIC:
            "pk_test_51M43sNGME5fNQ79Yhg9VFeOGAkBZQxEc1qJvGEeYAB7LvbxhkdURpSs7ujmNlTf80ejroHUX3f9WkPfUWjamAyCY00JDWWcWYe",
        STRIPE_PRIVATE:
            "sk_test_51M43sNGME5fNQ79Yfl3836eO15pEyIpD3NY1MXmR8wAQVhQkaEkO7ntjujeZFvxFD01epjSvXFKq7Fsxb9Zkc7sd00FukKKEVg",
    },
};
module.exports = nextConfig;
