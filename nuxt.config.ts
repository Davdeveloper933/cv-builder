export default defineNuxtConfig({
  ssr: false,
  alias: {
    assets: '/<rootDir>/assets',
  },
  runtimeConfig: {
    public: {},
  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1.0',
      // "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=visibility"
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Gelasio:ital,wght@0,400..700;1,400..700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
        },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.js',
          integrity:
            'sha512-dBB2PGgYedA6vzize7rsf//Q6iuUuMPvXCDybHtZP3hQXCPCD/YVJXK3QYZ2v0p7YCfVurqr8IdcSuj4CCKnGg==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
        },
        {
          src: 'http://html2canvas.hertzen.com/dist/html2canvas.js',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js',
        },
      ],
    },
  },

  compatibilityDate: '2025-04-14',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/image'],
})
