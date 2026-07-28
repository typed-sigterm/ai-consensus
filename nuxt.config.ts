export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
  ],

  app: {
    head: {
      title: 'AI Consensus Tracker',
      htmlAttrs: { lang: 'en' },
    },
  },

  css: ['~/app.css'],

  ssr: false,

  compatibilityDate: '2026-07-28',

  routeRules: {
    '/': { prerender: true },
    '/tracks/open-weights-letter': { prerender: true },
    '/tracks/agents-md': { prerender: true },
    '/tracks/agent-skills': { prerender: true },
  },

  nitro: {
    preset: 'cloudflare-module',

    cloudflare: {
      wrangler: {
        name: 'ai-consensus',
        workers_dev: true,
        route: {
          pattern: 'ai-consensus.by-ts.top',
          custom_domain: true,
        },
      },
    },
  },

  fonts: {
    provider: 'bunny',
    providers: {
      google: false,
      googleicons: false,
    },
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },
});
