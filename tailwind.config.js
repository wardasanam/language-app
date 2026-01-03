/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Spec-Ops Palette
        slate: {
          950: '#020617', // Deeper black-blue for the void
          900: '#0f172a', // Background for glass cards
          800: '#1e293b', // Elevated tactical panels
        },
        blue: {
          400: '#60a5fa', // Holographic text
          500: '#3b82f6', // Primary energy color
          600: '#2563eb', // Combat buttons
        }
      },
      animation: {
        // Slow bounce for the landing rocket
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
        // Pulse for the Level Indicator
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Spinning for background hexagons
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      backdropBlur: {
        '3xl': '64px', // Extra deep blur for the cockpit look
      },
      boxShadow: {
        // Neon energy glows
        'neon-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
        'neon-red': '0 0 15px rgba(239, 68, 68, 0.5)',
        'neon-green': '0 0 15px rgba(34, 197, 94, 0.5)',
      }
    },
  },
  plugins: [],
}