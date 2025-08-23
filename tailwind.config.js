/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Главный фирменный синий из логотипа
        brand: {
          50: '#F2F4FF',
          100: '#E7EAFF',
          200: '#C9D0F2',
          300: '#AEB9EA',
          400: '#7D86C8',
          500: '#5A63A7',
          600: '#3B4286', // base
          700: '#2F356C',
          800: '#232854',
          900: '#1A1E40',
          DEFAULT: '#3B4286',
        },

        // Тёплый «солнечный» оранжевый из лучей
        sun: {
          50: '#FFF6E8',
          100: '#FFE9C6',
          200: '#FFD79A',
          300: '#FEC66E',
          400: '#F9B15B', // base из логотипа
          500: '#E69C49',
          600: '#CE8A3E',
          700: '#B37633',
          800: '#915D25',
          900: '#6E4518',
          DEFAULT: '#F9B15B',
        },

        // Подходящий «голубой» для акцентов/подложек/ссылок
        sky: {
          50: '#F0F7FF',
          100: '#E4F2FF',
          200: '#CDE6FF',
          300: '#A9D4FF',
          400: '#7BB8FF',
          500: '#4EA1FF', // base
          600: '#1F87F5',
          700: '#166FCC',
          800: '#1058A6',
          900: '#0C447F',
          DEFAULT: '#4EA1FF',
        },

        // Нейтрали
        ink: '#0F172A',
        muted: '#94A3B8',
        border: '#E2E8F0',
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
