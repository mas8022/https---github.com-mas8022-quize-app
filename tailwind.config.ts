import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xxm: "380px",
        xm: "500px",
        sm: "640px",
        md: "768px",
        xd: "815px",
        xxd: "875px",
        mmd: "940px",
        ld: "1000px",
        lg: "1024px",
        lgg: "1112px",
        xl: "1280px",
        xxl: "1312px",
        "2xl": "1536px",
      },
      colors: {
        first: "#ffffff",
        second: "#6d28d9",
      },
      fontFamily: {
        bold: "yekBold",
        medium: "yekRegular",
      },
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (name: string, style: string) => void }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};

export default config;
