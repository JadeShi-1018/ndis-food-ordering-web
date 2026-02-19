import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--color-main)",         // #285770
        secondary: "var(--color-secondary)",  // #E1F0F2
        map1: "var(--color-map1)",
        map2: "var(--color-map2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
