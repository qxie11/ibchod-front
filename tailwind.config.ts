import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-readex)', 'sans-serif'],
        body: ['Readex Pro', 'sans-serif'],
        headline: ['Readex Pro', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: '#f5f6f7',
        foreground: '#23272f',
        card: {
          DEFAULT: '#fff',
          foreground: '#23272f',
        },
        popover: {
          DEFAULT: '#fff',
          foreground: '#23272f',
        },
        primary: {
          DEFAULT: '#120a8f',
          foreground: '#fff',
        },
        secondary: {
          DEFAULT: '#f3f4f6',
          foreground: '#1a1a1a',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT: '#2563eb',
          foreground: '#fff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#fafafa',
        },
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#2563eb',
        chart: {
          '1': '#fa8231',
          '2': '#1abc9c',
          '3': '#34495e',
          '4': '#f7b731',
          '5': '#fd9644',
        },
        sidebar: {
          DEFAULT: '#23272f',
          foreground: '#fafafa',
          primary: '#2563eb',
          'primary-foreground': '#fff',
          accent: '#2563eb',
          'accent-foreground': '#fff',
          border: '#23272f',
          ring: '#2563eb',
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
