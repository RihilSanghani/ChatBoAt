/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  theme: {
    extend: {
      animation: {
        slideInSender: "slideInSender 0.3s ease-out",
        slideInReceiver: "slideInReceiver 0.3s ease-out",
      },
      keyframes: {
        slideInSender: {
          "0%": { transform: "translateX(50%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideInReceiver: {
          "0%": { transform: "translateX(-50%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
    },
  },
};