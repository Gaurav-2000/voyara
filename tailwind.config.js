/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        sand: '#F0E9DC',
        terra: '#D4622A',
        'terra-light': '#E8825A',
        'terra-dark': '#B84E20',
        dark: '#1A1208',
        mid: '#4A3F35',
        muted: '#9A8F85',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        hintPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-4px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          from: { transform: 'translateY(120px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        float2: 'float 6s ease-in-out infinite 1s',
        float3: 'float 6s ease-in-out infinite 2s',
        pulse2: 'pulse2 2s infinite',
        marquee: 'marqueeScroll 28s linear infinite',
        hintPulse: 'hintPulse 2.5s ease-in-out infinite',
      },
      boxShadow: {
        card: '0 20px 60px rgba(26,18,8,0.10)',
        'card-hover': '0 30px 80px rgba(26,18,8,0.18)',
        terra: '0 8px 25px rgba(212,98,42,0.35)',
        badge: '0 15px 40px rgba(26,18,8,0.15)',
      },
      backgroundImage: {
        'hero-grad': 'linear-gradient(135deg,#F0E9DC 0%,#E8D5BB 100%)',
        'subscribe-grad': 'linear-gradient(135deg,#D4622A 0%,#B84E20 100%)',
      },
    },
  },
  plugins: [],
}
