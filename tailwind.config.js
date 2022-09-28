/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                home: "url('../images/home.png')",
                test: "url('../images/test1.jpg')",
                back: "url('../images/back.png')",
            },
            colors: {
                background: "#2A303C",
                myRed: "#b43332",
                myPurple: "#48345E",
            },
        },
    },
    plugins: [require("daisyui")],
};
