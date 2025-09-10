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
        background: '#111827', // A very dark, slightly desaturated blue
        'background-secondary': '#1F2937', // A slightly lighter shade for cards
        text: '#E5E7EB', // A soft, light grey for readability
        'text-accent': '#F9FAFB', // Pure white or a brighter off-white for headings
        primary: '#8B5CF6', // A vibrant violet for accents
      },
    },
  },
  plugins: [],
};
