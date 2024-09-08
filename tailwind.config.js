/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        pc: 1200,
        ta: 744,
        mo: 375,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        "bestpost-pc": "38.4rem",
        "bestpost-ta": "34rem",
        "bestport-mo": "34.3rem",
      },
      height: {
        "bestpost-pc": "16.9rem",
        "bestpost-ta": "19.8rem",
        "bestport-mo": "19.8rem",
      },
    },
  },
  plugins: [],
};
