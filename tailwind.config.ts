import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B4158",
        sec: "#282E47",
        bgPrimary: "#F3F4F7",
        shadowOrBorder: "#B7BFD0",
        hoverColor: "#7B89A8",
      },
    },
  },
  plugins: [],
};
export default config;
