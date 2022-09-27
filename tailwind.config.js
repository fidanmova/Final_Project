/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
    ],
    theme: {
        extend: {
            backgroundImage: {
                home: "url('../images/home.png')",
                test: "url('../images/test1.jpg')",
                back: "url('../images/back.png')",
            },
            colors: {
                background: "#2A303C",
            },
        },
    },
    plugins: [require("daisyui")],
};
