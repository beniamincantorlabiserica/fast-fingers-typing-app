/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        green: {
          600: '#16a34a',
        },
        red: {
          600: '#dc2626',
        },
        gray: {
          400: '#9ca3af',
        },
      },
    },
  },
  plugins: [require("daisyui")],
}

