/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F5EFE3',
          300: '#EDE3D0',
          400: '#E0D3B8',
          500: '#CDB994',
        },
        ink: {
          900: '#1F140D',
          800: '#2A1B12',
          700: '#3D2B1F',
          600: '#5C4A3A',
          500: '#7A6650',
          400: '#9A8A76',
        },
        brown: {
          900: '#3D2B1F',
          800: '#4A3526',
          700: '#6B4A2F',
          600: '#8B7355',
          500: '#A89177',
          400: '#C0AB8E',
        },
        gold: {
          700: '#9A7208',
          600: '#B8860B',
          500: '#C9A227',
          400: '#D4AF37',
          300: '#E0C560',
        },
        saffron: {
          700: '#9A5A12',
          600: '#B45309',
          500: '#C8741A',
          400: '#E89030',
          300: '#F0A850',
        },
        earth: {
          700: '#6B5D4F',
          600: '#8B7D6F',
          500: '#A89177',
          400: '#C0AB8E',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['Marcellus', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.7s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'warm': '0 4px 24px -8px rgba(61, 43, 31, 0.15)',
        'warm-lg': '0 12px 48px -12px rgba(61, 43, 31, 0.2)',
        'book': '0 8px 32px -8px rgba(42, 27, 18, 0.3), 0 2px 8px -2px rgba(42, 27, 18, 0.15)',
        'gold': '0 0 0 1px rgba(184, 134, 11, 0.2), 0 4px 16px -4px rgba(184, 134, 11, 0.15)',
      },
    },
  },
  plugins: [],
};
