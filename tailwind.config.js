/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /* ───────────────────────────────────────────
         CUSTOM FONT STACK
         Headings  → Bricolage Grotesque (variable, distinctive)
         Body      → DM Sans (clean, highly readable)
         Code      → JetBrains Mono (ligatures, dev-friendly)
      ─────────────────────────────────────────── */
      fontFamily: {
        display: ['Bricolage Grotesque', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      /* ───────────────────────────────────────────
         COLOR SYSTEM
         A refined palette inspired by terminal greens
         and deep-space UI patterns.
      ─────────────────────────────────────────── */
      colors: {
        surface: {
          50: '#f8fafb',
          100: '#f0f3f5',
          200: '#e2e8ec',
          300: '#c9d3da',
          400: '#94a3b0',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          850: '#172033',
          900: '#0f172a',
          950: '#080d19',
        },
        accent: {
          DEFAULT: '#22d3ee',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        glow: {
          cyan: '#22d3ee',
          emerald: '#34d399',
          violet: '#a78bfa',
          amber: '#fbbf24',
          rose: '#fb7185',
        },
      },

      /* Animation keyframes */
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },

      /* Typography plugin overrides */
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.surface.700'),
            '--tw-prose-headings': theme('colors.surface.900'),
            '--tw-prose-links': theme('colors.accent.600'),
            '--tw-prose-code': theme('colors.accent.700'),
            maxWidth: '72ch',
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.surface.300'),
            '--tw-prose-headings': theme('colors.surface.50'),
            '--tw-prose-links': theme('colors.accent.400'),
            '--tw-prose-code': theme('colors.accent.300'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
