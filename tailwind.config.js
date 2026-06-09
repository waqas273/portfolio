/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: 'var(--bg-primary)',
          950: '#040405',
          900: 'var(--bg-primary)',
          800: '#121214',
          700: '#1a1a1e',
          600: '#27272a',
          500: '#3f3f46',
        },
        matrix: {
          DEFAULT: 'var(--color-matrix)',
          glow: 'var(--color-matrix-glow)',
          muted: 'var(--color-matrix-muted)',
        },
        cyber: {
          DEFAULT: 'var(--color-cyber)',
          glow: 'var(--color-cyber-glow)',
          muted: 'var(--color-cyber-muted)',
        },
        electric: {
          DEFAULT: 'var(--color-electric)',
          glow: 'var(--color-electric-glow)',
          muted: 'var(--color-electric-muted)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'grid-move': 'gridMove 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse-matrix': 'glowPulseMatrix 2s ease-in-out infinite alternate',
        'glow-pulse-cyber': 'glowPulseCyber 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gridMove: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        },
        glowPulseMatrix: {
          '0%': { boxShadow: '0 0 5px rgba(0, 255, 102, 0.2), 0 0 10px rgba(0, 255, 102, 0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(0, 255, 102, 0.5), 0 0 25px rgba(0, 255, 102, 0.3)' },
        },
        glowPulseCyber: {
          '0%': { boxShadow: '0 0 5px rgba(0, 255, 255, 0.2), 0 0 10px rgba(0, 255, 255, 0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(0, 255, 255, 0.5), 0 0 25px rgba(0, 255, 255, 0.3)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
