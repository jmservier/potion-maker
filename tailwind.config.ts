import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Subtle magical palette
        sage: {
          light: "#F7F9F7",
          DEFAULT: "#E8F0E8",
          dark: "#D4E4D4",
        },
        lavender: {
          light: "#F8F7FF",
          DEFAULT: "#E8E5FF",
          dark: "#D4CFFF",
        },
        amber: {
          light: "#FFF9E6",
          DEFAULT: "#F3E5AB",
          dark: "#E6D690",
        },
        slate: {
          light: "#F8FAFC",
          DEFAULT: "#64748B",
          dark: "#475569",
          deeper: "#334155",
        },
        magical: {
          purple: "#A78BFA",
          gold: "#FBBF24",
          teal: "#5EEAD4",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "gentle-bounce": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "gentle-bounce": "gentle-bounce 2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-crimson)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(139, 92, 246, 0.1)",
        medium: "0 4px 16px rgba(139, 92, 246, 0.15)",
        large: "0 8px 32px rgba(139, 92, 246, 0.2)",
        warm: "0 4px 20px rgba(245, 158, 11, 0.3)",
        glow: "0 0 20px rgba(245, 158, 11, 0.4)",
        mystical: "0 0 30px rgba(139, 92, 246, 0.3)",
        golden: "0 4px 25px rgba(245, 158, 11, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
