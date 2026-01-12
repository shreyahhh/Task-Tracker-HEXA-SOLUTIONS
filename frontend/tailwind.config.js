/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vercel-blue': '#0070F3',
        'surface': {
          '100': '#111111',
          '200': '#1A1A1A',
        },
        'border': {
          '100': '#2A2A2A',
          '200': '#333333',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

