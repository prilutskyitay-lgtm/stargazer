/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        cosmos: {
          void: "#05060d",
          deep: "#0a0d1f",
          dust: "#1a1d3a",
          glow: "#7c5cff",
          star: "#e8eaf6",
          ember: "#ff7a59",
          ice: "#7dd3fc",
        },
      },
      animation: {
        "fade-up": "fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
        twinkle: "twinkle 3s ease-in-out infinite",
        drift: "drift 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(10%)" },
        },
      },
    },
  },
  plugins: [],
};
