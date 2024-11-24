import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3692ff",
          200: "#1967d6",
          300: "#1251aa",
        },
        error: "#f74747",
        "cool-gray": {
          100: "#f3f4f6",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
