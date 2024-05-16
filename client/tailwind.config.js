/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value> )',
        primaryVar: 'rgb(var(--color-primary-variant) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        secondaryVar: 'rgb(var(--color-secondary-variant) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        onPrimary: 'rgb(var(--color-on-primary) / <alpha-value>)',
        onSecondary: 'rgb(var(--color-on-secondary) / <alpha-value>)',
        onBackground: 'rgb(var(--color-on-background) / <alpha-value>)',
        onSurface: 'rgb(var(--color-on-surface) / <alpha-value>)',
        onError: 'rgb(var(--color-on-error) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}

