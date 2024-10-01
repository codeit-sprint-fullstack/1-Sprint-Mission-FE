const { wrap } = require("lodash");

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
        solitude: "#E6F2FF",
        "dodger-blue": "#3182F6",
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
        // simple-sign-in
        "simple-sign-in": "64rem",
        "mobile-simple-sign-in": "34.3rem",
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
        // simple-sign-in
        "simple-sign-in": "7.4rem",
        // post-middle-bar
        "post-middle-bar": "7.2rem",
      },
      fontSize: {
        base: "10px",
        "3xl": "3.2rem",
        "2xl": "2.4rem",
        xl: "2rem",
        "2lg": "1.8rem",
        lg: "1.6rem",
        "1.5rem": "1.5rem",
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
      borderRadius: {
        "3.5em": "3.5em",
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
        // serch-label
        "search-label": "46.3rem",
        "tablet-search-label": "3.8rem",
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
        "6.2rem": "6.2rem",
        "5rem": "5rem",
        "4.8rem": "4.8rem",
        "4.2rem": "4.2rem",
        "4rem": "4rem",
        "3.4rem": "3.4rem",
        "3.2rem": "3.2rem",
        "2.6rem": "2.6rem",
        "2.4rem": "2.4rem",
        "2rem": "2rem",
        "1.6rem": "1.6rem",
        "1.2rem": "1.2rem",
        "0.8rem": "0.8rem",
        "0.4rem": "0.4rem",
        "0.2rem": "0.2rem",
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
        "oauth-btn__google": "url('/buttons/btn_google.svg')",
        "oauth-btn__kakao": "url('/buttons/btn_kakao.svg')",
        "favorite-heart--full": "url('/icons/ic_heart_small.svg')",
        "favorite-heart--empty": "url('/icons/ic_heart_empty_small.svg')",
        "btn-link-regist": "url('/buttons/btn_regist_product.svg')",
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
    function ({ addComponents, theme }) {
      const components = {
        ".main": {
          marginTop: "7rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "3.2rem",
          "@screen tablet": {
            paddingTop: "2.4rem",
          },
          "@screen mobile": {
            paddingTop: "2.4rem",
          },
        },
        ".content": {
          width: theme("width.pc-content"),
          "@screen tablet": {
            width: theme("width.tablet-content"),
          },
          "@screen mobile": {
            width: theme("width.mobile-content"),
          },
        },
        ".sign-in__main": {
          display: "flex",
          flexDirection: "column",
          width: "64rem",
          margin: "23.1rem auto 23.1rem auto",
          "@screen tablet": {
            margin: "19rem auto 32.5rem auto",
          },
          "@screen mobile": {
            width: theme("width.mobile-content"),
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
          color: theme("colors.gray.800"),
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
          borderColor: theme("colors.gray.100"),
          backgroundColor: theme("colors.gray.100"),
          fontSize: "1.6rem",
          fontWeight: "400",
          color: theme("colors.gray.800"),
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
        ".warning-text": {
          paddingLeft: "1.6rem",
          fontSize: "1.5rem",
          fontWeight: "600",
          color: theme("colors.red"),
        },
        ".sign-in__btn": {
          width: "64rem",
          height: "5.6rem",
          "@screen mobile": {
            width: theme("width.mobile-content"),
          },
        },
        ".invalid-border": {
          borderColor: theme("colors.red"),
        },
        ".oauth-btn": {
          width: "4.2rem",
          height: "4.2rem",
          borderRadius: "50%",
        },
        ".product-image-list-set": {
          width: "48.6rem",
          height: "71rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "@screen tablet": {
            width: "34rem",
            height: "56.4rem",
          },
          "@screen mobile": {
            width: "34.4rem",
            height: "56rem",
          },
        },
        ".product-image-frame": {
          width: "48.6rem",
          height: "48.6rem",
          position: "relative",
          borderRadius: "1.6rem",
          overflow: "hidden",
          "@screen tablet": {
            width: "34rem",
            height: "34rem",
          },
          "@screen mobile": {
            width: "34.4rem",
            height: "34.4rem",
          },
        },
        ".product-image-list": {
          width: "48.6rem",
          height: "20rem",
          "@screen tablet": {
            width: "34rem",
            height: "20rem",
          },
          "@screen mobile": {
            width: "34.4rem",
            height: "20rem",
          },
        },
        ".product-name": {
          fontSize: "2.4rem",
          fontWeight: "600",
          lineHeight: "3.2rem",
          color: theme("colors.gray.800"),
          "@screen tablet": {
            fontSize: "2rem",
          },
          "@screen mobile": {
            fontSize: "1.6rem",
            lineHeight: "2.6rem",
          },
        },
        ".product-price": {
          marginTop: "1.6rem",
          fontSize: "4rem",
          fontWeight: "600",
          lineHeight: "5.2rem",
          color: theme("colors.gray.800"),
          "@screen tablet": {
            marginTop: "0.8rem",
            fontSize: "3.2rem",
            lineHeight: "4.2rem",
          },
          "@screen mobile": {
            marginTop: "0.8rem",
            fontSize: "2.4rem",
            lineHeight: "3.2rem",
          },
        },
        ".product-info-label": {
          fontSize: "1.6rem",
          fontWeight: "600",
          lineHeight: "2.6rem",
          color: theme("colors.gray.600"),
          "@screen tablet": {
            fontSize: "1.4rem",
            lineHeight: "2.4rem",
          },
          "@screen mobile": {
            fontSize: "1.4rem",
            lineHeight: "2.4rem",
          },
        },
        ".product-description": {
          height: "100%",
          marginTop: "1.6rem",
          fontSize: "1.6rem",
          fontWeight: "400",
          lineHeight: "2.6rem",
          color: theme("colors.gray.600"),
          "@screen tablet": {
            marginTop: "0.8rem",
          },
          "@screen mobile": {
            marginTop: "0.8rem",
          },
        },
        ".product-tag-text": {
          height: "3.6rem",
          borderRadius: "1em",
          boxSizing: "border-box",
          backgroundColor: theme("colors.gray.100"),
          padding: "0.5rem 1.6rem",
          fontSize: "1.6rem",
          fontWeight: "400",
          lineHeight: "2.6rem",
          textWrap: "nowrap",
          color: theme("colors.gray.800"),
        },
        ".btn-to-list": {
          width: "24rem",
          height: "4.8rem",
          backgroundImage: "url(/buttons/btn_medium.svg)",
        },
        ".btn-comment-regist": {
          width: "7.4rem",
          height: "4.2rem",
          backgroundImage: "url(/buttons/btn_registration_w74.svg)",
          "&:disabled": {
            backgroundImage: "url(/buttons/btn_registration_w74_disabled.svg)",
          },
        },
        ".simple-modal": {
          position: "fixed",
          inset: "0px",
          zIndex: "999",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4rem",
          width: "54rem",
          height: "25rem",
          backgroundColor: "white",
          borderRadius: "0.8em",
          "@screen mobile": {
            width: "32.7rem",
            height: "22rem",
            gap: "4.2rem",
          },
        },
        ".text-simple-modal": {
          fontSize: "1.8rem",
          color: theme("colors.gray.800"),
          lineHeight: "2.6rem",
          fontWeight: 500,
        },
        ".btn-simple-modal": {
          width: "16.5rem",
          height: "4.8rem",
          backgroundImage: "url(/buttons/btn_confirm_w165.svg)",
          "@screen mobile": {
            width: "12rem",
            backgroundImage: "url(/buttons/btn_confirm_w120.svg)",
          },
        },
        ".empty-comment-list": {
          width: theme("width.pc-content"),
          height: "20.8rem",
          "@screen tablet": {
            width: theme("width.tablet-content"),
          },
          "@screen mobile": {
            width: theme("width.mobile-content"),
          },
        },
        ".empty-comment-list_mark-text-set": {
          width: "15.0rem",
          heigth: "20.8rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".empty-comment-list_mark": {
          width: "14rem",
          height: "14rem",
          backgroundImage: "url('/images/Img_reply_empty.svg')",
        },
        ".empty-comment-list_text": {
          width: "15.1rem",
          height: "5.2rem",
          fontSize: "1.6rem",
          lineHeight: "2.6rem",
          color: theme("colors.gray.400"),
          textAlign: "center",
        },
        ".comment-list": {
          width: theme("width.pc-content"),
          gap: "2.4rem",
          display: "flex",
          flexDirection: "column",
          "@screen tablet": {
            width: theme("width.tablet-content"),
            gap: "2.4rem",
          },
          "@screen mobile": {
            width: theme("width.mobile-content"),
            gap: " 1.6rem",
          },
        },
        ".comment": {
          height: "10rem",
          backgroundColor: theme("colors.alabaster"),
          borderBottom: "0.1rem solid",
          borderColor: theme("colors.gray.200"),
          "@screen mobile": {
            height: "9.6rem",
          },
        },
        ".comment__nickname-last-date": {
          display: "flex",
          flexDirection: "column",
          marginLeft: "0.8rem",
          gap: "0.4rem",
        },
        ".comment__nickname": {
          fontSize: "1.4rem",
          lineHeight: "1.8rem",
          color: theme("colors.gray.600"),
        },
        ".comment-modifier__textarea": {
          boxSizing: "border-box",
          width: "100%",
          height: "8rem",
          padding: "1.6rem 2.4rem",
          backgroundColor: theme("colors.gray.100"),
          fontSize: "1.4rem",
          lineHeight: "2.4rem",
          fontWeight: 400,
          borderRadius: "0.85714em",
          resize: "none",
        },
        ".comment-modifier__btn-complete-cancel": {
          width: "6.8rem",
          height: "4.2rem",
          fontSize: "1.6rem",
          fontWeight: 600,
          color: theme("colors.gray.500"),
        },
        ".comment-modifier__btn-complete-modify": {
          width: "10.6rem",
          height: "4.2rem",
          backgroundImage: "url(/buttons/btn_modify_complete.svg)",
        },
      };
      addComponents(components);
    },
  ],
};
