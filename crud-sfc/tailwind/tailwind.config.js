// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        // './resources/assets/**/*.blade.php',
        // './resources/assets/**/*.js',
        './src/**/*.vue',
        // './resources/views/tailwind/**/*.blade.php',
        // './public/pages/*.html',
        // './test-vue/hello/src/**/*.vue'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            zIndex: {
                "1": "1",
                "-1": "-1",
                "-10": "-10",
                "-20": "-20",
                "60" : "60",
                "70" : "70",
                "10000" : "10000",
            },
            transformOrigin: {
                "0": "0%",
            },
            colors: {
                'transparent-black' : 'rgba(0,0,0,.2)',
                'orange' : colors.orange,
                'info' : '#73e7f7',
                'brand' : '#4E8C95'
            },
            fontFamily: {
                'layout' : ['Sriracha'],
                'body' : ['Roboto','sans-serif']
            }
            // height: {
            //     'px-70': '70px',
            // }

        }
    },
    variants: {
        borderRadius : ['responsive','first','last'],
        borderWidth : ['responsive','first','last'],
        extend: {
            backgroundColor: ['odd','even'],
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
