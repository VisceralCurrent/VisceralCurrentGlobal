/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'visceral-gold': '#00e5ff',
        'visceral-dark': '#050a0f',
        'visceral-scarlett': '#e11d48',
        visceral: {
          gold: '#00e5ff',
          dark: '#050a0f',
          scarlett: '#e11d48',
          card: 'rgba(15, 17, 21, 0.65)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      animation: {
        'slow-spin': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        }
      }
    }
  },
  plugins: [],
}