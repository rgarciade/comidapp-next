const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontSize: {
                "4xl": "2.8rem",
                "3xl": "1.8rem",
                "2xl": "1.5rem"
            },
            textShadow: {
                "2xl": "5px 10px;"
            },
            textColor: {
                "primary": "#E49756",
                "secondary": "#bb7e4b"
            },
            colors: {
                "primary": "#E49756",
                "secondary": "#bb7e4b",
            },
            backgroundColor: {
                "primary": "#E49756",
                "secondary": "#bb7e4b",
            },
            themeColor: {
                "primary": "#f7f7f7"
            },
        },
    },
    plugins: [
        plugin(function ({addBase, theme}) {
            addBase({
                "h1": {fontSize: theme("fontSize.4xl")},
                "h2": {fontSize: theme("fontSize.3xl")},
                "h3": {fontSize: theme("fontSize.2xl")}
            });
        })
    ],
}
