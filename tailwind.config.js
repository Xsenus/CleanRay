/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E40AF',
          50: '#F0F4FF',
          100: '#E7F0FF',
          600: '#1D4ED8',
        },
        ink: '#0F172A',
        muted: '#94A3B8',
        border: '#E2E8F0',

        sun: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FBBF24',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          DEFAULT: '#F59E0B',
        },
      },

      fontFamily: {
        montserrat: ['Montserrat', 'system-ui', 'Arial', 'sans-serif'],
      },

      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
        '2xl': '0.75rem',
      },
    },
  },
  plugins: [],
};
