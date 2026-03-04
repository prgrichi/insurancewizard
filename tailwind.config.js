export default {
  content: ['./index.html', './**/*.{vue,js,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        /* Background */
        page: 'var(--color-bg-page)',
        surface: 'var(--color-bg-surface)',

        /* Text */
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',

        /* Border */
        border: 'var(--color-border)',

        /* Brand */
        brand: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },

        /* Status */
        // success: 'var(--color-success)',
        // warning: 'var(--color-warning)',
        // danger: 'var(--color-danger)',
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
      },
    },
  },
  plugins: [],
};
