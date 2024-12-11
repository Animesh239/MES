import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "rainbow-shadow": "rainbowShadow 5s linear infinite",
      },
      keyframes: {
        rainbowShadow: {
          "0%": { boxShadow: "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #f00" },
          "20%": {
            boxShadow: "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #ff0",
          },
          "40%": {
            boxShadow: "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #0f0",
          },
          "60%": {
            boxShadow: "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #0ff",
          },
          "80%": {
            boxShadow: "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #00f",
          },
          "100%": {
            boxShadow: "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #f0f",
          },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      screens: {
        xsm: "475px",
        xxsm: "390px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
