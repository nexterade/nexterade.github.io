const themeConfig = require("./data/themeConfig.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: themeConfig.base.bg0,
        ink: themeConfig.base.bg1,
        silver: themeConfig.base.textMain,
        neon: {
          violet: themeConfig.accent.violet,
          cyan: themeConfig.accent.cyan,
          magenta: themeConfig.accent.magenta,
          amber: themeConfig.accent.amber
        }
      },
      boxShadow: {
        glow: "0 0 35px rgba(159, 92, 255, 0.45)",
        card: "0 20px 60px rgba(6, 7, 20, 0.55)"
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(circle at 15% 20%, rgba(159, 92, 255, 0.25), transparent 38%), radial-gradient(circle at 85% 10%, rgba(55, 244, 255, 0.18), transparent 42%), radial-gradient(circle at 55% 75%, rgba(255, 77, 184, 0.18), transparent 40%)"
      },
      animation: {
        pulseCue: "pulseCue 2.4s ease-in-out infinite",
        shimmer: "shimmer 6s ease-in-out infinite"
      },
      keyframes: {
        pulseCue: {
          "0%, 100%": { opacity: "0.25", transform: "translateY(0px)" },
          "50%": { opacity: "1", transform: "translateY(8px)" }
        },
        shimmer: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" }
        }
      }
    }
  },
  plugins: []
};
