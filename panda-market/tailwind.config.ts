import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/app/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", ...fontFamily.sans],
      },
      colors: {
        // Primary colors (파랑)
        primary: {
          100: "#3692FF",
          200: "#1967D6",
          300: "#1251AA",
        },
        // Secondary colors (그레이)
        secondary: {
          900: "#111827",
          800: "#1F2937",
          700: "#374151",
          600: "#4B5563",
          500: "#6B7280",
          400: "#9CA3AF",
          200: "#E5E7EB",
          100: "#F3F4F6",
          50: "#F9FAFB",
        },
        // Error color (빨강)
        error: {
          red: "#F74747",
        },
      },
      screens: {
        mobile: "375px",
        tablet: "744px",
        pc: "1200px",
      },
    },
  },
  plugins: [],
} satisfies Config;
