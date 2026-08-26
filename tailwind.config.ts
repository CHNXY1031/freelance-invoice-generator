import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211d",
        paper: "#f6f3eb",
        evergreen: "#164c3b",
        gold: "#c79a4a",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 33, 29, 0.10)",
        paper: "0 28px 80px rgba(23, 33, 29, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
