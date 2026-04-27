/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        catppuccin: {
          // Mocha (dark theme - default)
          crust: 'hsl(var(--crust-h, 240) var(--crust-s, 23%) var(--crust-l, 7%))',
          mantle: 'hsl(var(--mantle-h, 240) var(--mantle-s, 21%) var(--mantle-l, 9%))',
          base: 'hsl(var(--base-h, 240) var(--base-s, 21%) var(--base-l, 12%))',
          surface0: 'hsl(var(--surface0-h, 240) var(--surface0-s, 13%) var(--surface0-l, 19%))',
          surface1: 'hsl(var(--surface1-h, 240) var(--surface1-s, 13%) var(--surface1-l, 27%))',
          surface2: 'hsl(var(--surface2-h, 240) var(--surface2-s, 14%) var(--surface2-l, 34%))',
          text: 'hsl(var(--text-h, 220) var(--text-s, 23%) var(--text-l, 82%))',
          subtext0: 'hsl(var(--subtext0-h, 219) var(--subtext0-s, 16%) var(--subtext0-l, 74%))',
          subtext1: 'hsl(var(--subtext1-h, 220) var(--subtext1-s, 12%) var(--subtext1-l, 66%))',
          // Accent colors
          rosewater: 'hsl(var(--rosewater-h, 10) var(--rosewater-s, 56%) var(--rosewater-l, 91%))',
          flamingo: 'hsl(var(--flamingo-h, 0) var(--flamingo-s, 59%) var(--flamingo-l, 88%))',
          pink: 'hsl(var(--pink-h, 316) var(--pink-s, 72%) var(--pink-l, 86%))',
          mauve: 'hsl(var(--mauve-h, 266) var(--mauve-s, 85%) var(--mauve-l, 58%))',
          red: 'hsl(var(--red-h, 343) var(--red-s, 81%) var(--red-l, 79%))',
          maroon: 'hsl(var(--maroon-h, 347) var(--maroon-s, 87%) var(--maroon-l, 77%))',
          peach: 'hsl(var(--peach-h, 22) var(--peach-s, 100%) var(--peach-l, 66%))',
          yellow: 'hsl(var(--yellow-h, 41) var(--yellow-s, 86%) var(--yellow-l, 83%))',
          green: 'hsl(var(--green-h, 105) var(--green-s, 48%) var(--green-l, 72%))',
          teal: 'hsl(var(--teal-h, 171) var(--teal-s, 53%) var(--teal-l, 70%))',
          sky: 'hsl(var(--sky-h, 189) var(--sky-s, 71%) var(--sky-l, 73%))',
          sapphire: 'hsl(var(--sapphire-h, 199) var(--sapphire-s, 89%) var(--sapphire-l, 70%))',
          blue: 'hsl(var(--blue-h, 217) var(--blue-s, 92%) var(--blue-l, 76%))',
          lavender: 'hsl(var(--lavender-h, 250) var(--lavender-s, 97%) var(--lavender-l, 85%))',
        }
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      screens: {
        sm: 'var(--breakpoint-sm)',
        md: 'var(--breakpoint-md)',
      }
    }
  },
  plugins: []
}
