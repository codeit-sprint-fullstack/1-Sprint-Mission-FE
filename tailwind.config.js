/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        pc: { min: "1200px" },
        tablet: { min: "744px", max: "1199px" },
        mobile: { min: "375px", max: "743px" },
      },
      colors: {
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        blue: {
          100: "#3692ff",
          200: "#1967d6",
          300: "#1251aa",
        },
        red: "#f74747",
        alto: "#dfdfdf",
        onahau: "#cfe5ff",
        "royal-blue": "#2f80ed",
        alabaster: "#fcfcfc",
        background: "#ffffff",
        foreground: "#171717",
      },
      width: {
        "pc-content": "120rem",
        "tablet-content": "69.6rem",
        "mobile-content": "34.3rem",
        // header-btn-home
        "pc-btn-home": "15.3rem",
        "mobile-btn-home": "8.1rem",
        // best-post
        "pc-bestpost": "38.4rem",
        "tablet-bestpost": "34rem",
        "mobile-bestport": "34.3rem",
      },
      height: {
        // header-btn-home
        "pc-btn-home": "5.1rem",
        "mobile-btn-home": "4rem",
        // best-post
        "pc-bestpost": "16.9rem",
        "tablet-bestpost": "19.8rem",
        "mobile-bestport": "19.8rem",
      },
      fontSize: {
        base: "10px",
        "3xl": "3.2rem",
        "2xl": "2.4rem",
        xl: "2rem",
        "2lg": "1.8rem",
        lg: "1.6rem",
        md: "1.4rem",
        sm: "1.3rem",
        xs: "1.2rem",
      },
      lineHeight: {
        lh42: "4.2rem",
        lh32: "3.2rem",
        lh26: "2.6rem",
        lh24: "2.4rem",
        lh22: "2.2rem",
        lh20: "2rem",
        lh18: "1.8rem",
      },
      borderWidth: {
        1: "0.1rem",
      },
      padding: {
        "pc-header": "20rem",
        "tablet-header": "2.4rem",
        "mobile-header": "1.6rem",
      },
      spacing: {
        "20rem": "20rem",
        header: "7rem",
        "3.2rem": "3.2rem",
        "2.4rem": "2.4rem",
        "2rem": "2rem",
        "1.6rem": "1.6rem",
      },
    },
  },
  plugins: [],
};
