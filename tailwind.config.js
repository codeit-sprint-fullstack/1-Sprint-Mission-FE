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
        // nav
        "pc-nav-item": "10.9rem",
        "mobile-nav-item": "7rem",
        // btn-sigb-in
        "btn-sign-in": "8.8rem",
        // footer-icon
        "footer-icon": "2rem",
        // btn-logo
        "btn-logo": "39.6rem",
        "mobile-btn-logo": "19.8rem",
        // loading
        loading: "12rem",
        // dropdown
        dropdown: "13rem",
        "mobile-dropdown-toggle": "4.2rem",
        // best-post
        "pc-best-post": "38.4rem",
        "tablet-best-post": "34rem",
        "mobile-best-post": "34.3rem",
        // btn-to-list
        "btn-to-list": "24rem",
        // btn-regist
        "btn-regist": "7.4rem",
        // best-product-preview
        "pc-best-product-preview": "28.2rem",
        "tablet-best-product-preview": "34.3rem",
        "mobile-best-product-preview": "34.3rem",
        // product-preview
        "product-preview": "22.1rem",
        "mobile-product-preview": "16.8rem",
        // board-search
        "board-search": "105.4rem",
        "tablet-board-search": "56rem",
        "mobile-board-search": "28.2rem",
        // product-search
        "product-search": "32.5rem",
        "tablet-product-search": "24.2rem",
        "mobile-product-search": "28.8rem",
        // btn-link-regist
        "btn-link-regist": "13.3rem",
        // btn-page
        "btn-page": "4rem",
      },
      height: {
        tool42: "4.2rem",
        // header-btn-home
        "pc-btn-home": "5.1rem",
        "mobile-btn-home": "4rem",
        // nav
        nav: "6.8rem",
        // btn-sigb-in
        "btn-sign-in": "4.2rem",
        // footer
        footer: "16rem",
        // footer-icon
        "footer-icon": "2rem",
        // btn-logo
        "btn-logo": "13.2rem",
        "mobile-btn-logo": "6.6rem",
        // loading
        loading: "6rem",
        // dropdown
        dropdown: "4.2rem",
        // best-board
        "pc-best-board": "21.7rem",
        "tablet-best-board": "24.6rem",
        "mobile-best-board": "24rem",
        "pc-best-board-list": "16.9rem",
        "tablet-best-board-list": "19.8rem",
        "mobile-best-board-list": "19.8rem",
        // best-post
        "pc-best-post": "16.9rem",
        "tablet-best-post": "19.8rem",
        "mobile-best-post": "19.8rem",
        // btn-to-list
        "btn-to-list": "4.8rem",
        // comment-text-area-frame
        "comment-text-area-frame": "10.4rem",
        // best-product-preview
        "pc-best-product-preview": "37.8rem",
        "tablet-best-product-preview": "43.4rem",
        "mobile-best-product-preview": "43.4rem",
        // product-preview
        "product-preview": "31.7rem",
        "mobile-product-preview": "26.4rem",
        // product-preview-info
        "product-preview-info": "8rem",
        // btn-page
        "btn-page": "4rem",
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
        42: "4.2rem",
        32: "3.2rem",
        26: "2.6rem",
        24: "2.4rem",
        22: "2.2rem",
        20: "2rem",
        18: "1.8rem",
      },
      borderWidth: {
        1: "0.1rem",
      },
      margin: {
        "mobile-footer": "7.6rem",
        // sign-in
        "sign-in-mt": "23.1rem",
        "sign-in-mb": "23.1rem",
        "tablet-sign-in-mt": "19rem",
        "tablet-sign-in-mb": "32.5rem",
        "mobile-sign-in-mt": "8rem",
        "mobile-sign-in-mb": "23.1rem",
        // btn-to-list-frame
        "btn-to-list-frame-mt": "6.4rem",
        "btn-to-list-frame-mb": "32.5rem",
        // comment-maker-frame
        "comment-maker-frame": "3.2rem",
        "tablet-comment-maker-frame": "4rem",
        // comment-list-frame
        "comment-list-frame": "4rem",
        "mobile-comment-list-frame": "2.4rem",
        // comment-text-area-frame
        "comment-text-area-frame": "0.9rem",
        // pagination
        "pagination-mt": "4.3rem",
      },
      padding: {
        "pc-header": "20rem",
        "tablet-header": "2.4rem",
        "mobile-header": "1.6rem",
      },
      gap: {
        "footer-link": "3rem",
        "footer-icons": "1.2rem",
      },
      spacing: {
        loading: "35rem",
        "20rem": "20rem",
        "8.4rem": "8.4rem",
        header: "7rem",
        "4.8rem": "4.8rem",
        "4.2rem": "4.2rem",
        "4rem": "4rem",
        "3.2rem": "3.2rem",
        "2.6rem": "2.6rem",
        "2.4rem": "2.4rem",
        "2rem": "2rem",
        "1.6rem": "1.6rem",
        "0.8rem": "0.8rem",
        "0.4rem": "0.4rem",
        "0.1rem": "0.1rem",
        "mobile-dropdown-menu-top": "-2.4rem",
        "mobile-dropdown-menu-left": "-8.8rem",
        // best-product-preview-image
        "pc-best-product-preview-image": "28.2rem",
        "tablet-best-product-preview-image": "34.3rem",
        "mobibest-product-preview-image": "34.3rem",
        // product-preview-image
        "product-preview-image": "22.1rem",
        "mobile-product-preview-image": "16.8rem",
      },
      backgroundImage: {
        "sign-in__btn": "url('/buttons/btn_sign_in_w640.svg')",
        "sign-in__btn--mobile": "url('/buttons/btn_sign_in_w343.svg')",
        "sign-in__btn--disabled":
          "url('/buttons/btn_sign_in_disabled_w640.svg')",
        "sign-in__btn--mobile--disabled":
          "url('/buttons/btn_sign_in_disabled_w343.svg')",
      },
      borderColor: {
        "input--focus": "#3692FF",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["disabled"],
      borderColor: ["focus"],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".sign-in__main": {
          display: "flex",
          flexDirection: "column",
          width: "64rem",
          margin: "23.1rem auto 23.1rem auto",
          "@screen tablet": {
            margin: "19rem auto 32.5rem auto",
          },
          "@screen mobile": {
            width: "34.3rem",
            margin: "8rem auto 23.1rem auto",
          },
        },
        ".sign-in__btn-logo-frame": {
          width: "39.6rem",
          height: "13.2rem",
          margin: "0 auto",
          "@screen mobile": {
            width: "19.8rem",
            height: "6.6rem",
          },
        },
        ".sign-in__btn-logo": {
          width: "39.6rem",
          height: "13.2rem",
          backgroundImage: "url(/buttons/btn_logo.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          "@screen mobile": {
            width: "19.8rem",
            height: "6.6rem",
          },
        },
        ".sign-in__input-set": {
          display: "flex",
          flexDirection: "column",
          marginBottom: "2.4rem",
          width: "100%",
        },
        ".sign-in__label": {
          height: "2.6rem",
          marginBottom: "1.6rem",
          fontSize: "1.8rem",
          fontWeight: "700",
          color: "#1f2937",
          "@screen mobile": {
            fontSize: "1.4rem",
            marginBottom: "0.8rem",
          },
        },
        ".sign-in__input-frame": {
          width: "100%",
          height: "5.6rem",
          position: "relative",
        },
        ".sign-in__input": {
          width: "100%",
          height: "5.6rem",
          paddingLeft: "1.6rem",
          boxSizing: "border-box",
          border: "0.1rem solid",
          borderRadius: "0.75em",
          borderColor: "#f3f4f6",
          backgroundColor: "#f3f4f6",
          fontSize: "1.6rem",
          fontWeight: "400",
          color: "#1f2937",
        },
        ".input--visible": {
          width: "2.4rem",
          height: "2.4rem",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "1.6rem",
          content: "url(/buttons/btn_visible.svg)",
        },
        ".input--invisible": {
          width: "2.4rem",
          height: "2.4rem",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "1.6rem",
          content: "url(/buttons/btn_invisible.svg)",
        },
        ".sign-in__warn": {
          paddingLeft: "1.6rem",
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#F74747",
        },
        ".sign-in__btn": {
          width: "64rem",
          height: "5.6rem",
          "@screen mobile": {
            width: "34.3rem",
          },
        },
        ".invalid-border": {
          borderColor: "#F74747",
        },
      });
    },
  ],
};
