/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loader: {
          "0%": { left: "0%" },
          "50%": { left: "100%" },
        },
      },
      animation: {
        loader: "loader 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
