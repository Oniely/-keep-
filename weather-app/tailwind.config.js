/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/App.tsx",
        "./src/components/SearchPlaces.tsx",
        "./src/components/Forecast.tsx",
    ],
    theme: {
        extend: {
            colors: {
                'whiteIsh': '#f2fbff',
            }
        },
    },
    plugins: [],
}

