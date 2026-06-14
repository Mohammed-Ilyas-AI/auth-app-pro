import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],

  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
      },

      backdropBlur: {
        xs: '2px',
      },

      boxShadow: {
        glass: '0 8px 32px rgba(31,38,135,0.37)',

        neon: '0 0 20px rgba(14,165,233,0.5)',

        premium: '0 25px 50px rgba(0,0,0,0.4)',
      },

      animation: {
        float: 'float 6s ease-in-out infinite',

        glow: 'glow 3s ease-in-out infinite',

        aurora: 'aurora 12s linear infinite',
      },

      keyframes: {
        float: {
          '0%,100%': {
            transform: 'translateY(0px)',
          },

          '50%': {
            transform: 'translateY(-20px)',
          },
        },

        glow: {
          '0%,100%': {
            opacity: '0.6',
          },

          '50%': {
            opacity: '1',
          },
        },

        aurora: {
          '0%': {
            backgroundPosition: '0% 50%',
          },

          '100%': {
            backgroundPosition: '200% 50%',
          },
        },
      },
    },
  },

  plugins: [],
} satisfies Config;
