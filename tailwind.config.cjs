/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050014",
        panel: "#0c0420",
        accent: "#8f00ff",
        neon: "#00ffff",
        text: "#f8f9ff",
      },
      boxShadow: {
        glow: "0 0 20px rgba(143, 0, 255, 0.5)",
      },
      animation: {
        pulseGlow: "pulseGlow 3s infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(143, 0, 255, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 255, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};
