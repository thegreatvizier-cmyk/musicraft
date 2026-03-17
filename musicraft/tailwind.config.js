/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0B0B0F',
        tangerine: '#FF6B2B',
        magenta: '#E61F7A',
        violet: '#8B5CF6',
        signal: '#F0E6FF',
        surface: '#13131A',
        mid: '#1A1A24',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(90deg, #FF6B2B, #E61F7A)',
        'gradient-neon-full': 'linear-gradient(135deg, #FF6B2B 0%, #E61F7A 50%, #8B5CF6 100%)',
        'gradient-violet': 'linear-gradient(160deg, rgba(139,92,246,0.15) 0%, rgba(11,11,15,0) 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};