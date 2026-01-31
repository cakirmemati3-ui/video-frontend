import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Neon color palette
        neon: {
          blue: "#00D4FF",
          purple: "#B721FF",
          pink: "#FF006E",
          green: "#00FF94",
        },
        // Dark theme colors
        dark: {
          bg: "#0A0E27",
          card: "#141B3C",
          lighter: "#1E2749",
          border: "#2A3659",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-neon": "linear-gradient(135deg, #B721FF 0%, #00D4FF 100%)",
        "gradient-dark": "linear-gradient(135deg, #0A0E27 0%, #1E2749 100%)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(183, 33, 255, 0.3)",
        "neon-strong": "0 0 30px rgba(0, 212, 255, 0.8), 0 0 60px rgba(183, 33, 255, 0.5)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(183, 33, 255, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
