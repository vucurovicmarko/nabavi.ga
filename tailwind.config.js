const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./public/index.html",
        "./src/**/*.{vue,js}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
