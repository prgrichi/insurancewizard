export default {
  content: ['./index.html', './**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--color-bg-page)',
        surface: 'var(--color-bg-surface)',

        text: {
          main: 'var(--color-text-primary)',
          muted: 'var(--color-text-secondary)',
        },

        border: 'var(--color-border)',

        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
        },
      },

      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },

      maxWidth: {
        app: '1200px',
        content: '800px',
      },
    },
  },
  plugins: [],
};
