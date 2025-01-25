import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
} satisfies Config;
