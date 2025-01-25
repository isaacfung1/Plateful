import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "green-bg": "#0c3b31",
        "text-1": "#ef3029",
        "bg-main": "#fdf7ee",
        "light-green": "#e4f223",
        "dark-green": "#0b4d3f",
      },
    },
  },
  plugins: [],
};

export default config;