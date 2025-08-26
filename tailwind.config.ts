import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-readex)', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'hero-gradient': {
          '0%, 100%': {
            opacity: '0.8',
            transform: 'scale(1) rotate(0deg)',
          },
          '25%': {
            opacity: '1',
            transform: 'scale(1.05) rotate(1deg)',
          },
          '50%': {
            opacity: '0.9',
            transform: 'scale(1.02) rotate(-1deg)',
          },
          '75%': {
            opacity: '1',
            transform: 'scale(1.03) rotate(0.5deg)',
          },
        },
        'hero-gradient-reverse': {
          '0%, 100%': {
            opacity: '0.6',
            transform: 'scale(1) rotate(0deg)',
          },
          '33%': {
            opacity: '0.8',
            transform: 'scale(1.03) rotate(-1deg)',
          },
          '66%': {
            opacity: '0.7',
            transform: 'scale(1.01) rotate(1deg)',
          },
        },
        'hero-gradient-slow': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1) rotate(0deg)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'scale(1.02) rotate(0.5deg)',
          },
        },
        'float-1': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-30px) translateX(-15px)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-15px) translateX(20px)' },
        },
        'float-4': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-25px) translateX(-10px)' },
        },
        'float-5': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-35px) translateX(15px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'hero-gradient': 'hero-gradient 6s ease-in-out infinite',
        'hero-gradient-reverse': 'hero-gradient-reverse 8s ease-in-out infinite',
        'hero-gradient-slow': 'hero-gradient-slow 10s ease-in-out infinite',
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-3': 'float-3 10s ease-in-out infinite',
        'float-4': 'float-4 7s ease-in-out infinite',
        'float-5': 'float-5 9s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
