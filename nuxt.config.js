export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "olympia-web",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=no",
      },

      {
        name: "format-detection",
        content: "telephone=no",
      },
      {
        name: "msapplication-TileColor",
        content: "#ffffff",
      },
      {
        name: "theme-color",
        content: "#ffffff",
      },
      {
        name: "facebook-domain-verification",
        content: "t9erw8clhkri7tsm3y7djmszq4heel",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        href: "/favicon/apple-touch-icon.png",
        sizes: "144x144",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "shortcut icon",
        type: "image/png",
        href: "/favicon/favicon.ico",
        sizes: "32x32",
      },
      {
        rel: "manifest",

        href: "/favicon/manifest.json",
      },

      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#DF2B2C",
      },
    ],
  },
  // render: {
  //   bundleRenderer: {
  //     shouldPreload: (file, type) => {
  //       return ['script', 'style', 'font'].includes(type)
  //     }
  //   }
  // },

  env: {
    strapiBaseUri: process.env.API_URL,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~static/css/global.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/string-cutter.js",
    "~/plugins/clickaway.js",
    {
      src: "~/plugins/vue-listable.js",
    },
    {
      src: "~/plugins/vueTable.js",
    },
  ],
  loading: {
    color: "#E02B2B",
    height: "3px",
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    // Equivalent to { path: '~/components' }
    "~/components",
    "~/components/ui",
    "~/components/home",
    "~/components/editions",
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/style-resources",
    "nuxt-compress",
    "nuxt-gsap-module",
    "@nuxtjs/fontawesome",
  ],
  styleResources: {
    scss: [
      "~static/scss/mixins.scss",
      "~static/scss/variables.scss",
      "~static/scss/colors.scss",
      "~static/scss/breackpoints.scss",
    ],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "nuxt-ssr-cache",

    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-compress",
    "@nuxtjs/i18n",
    [
      "@nuxtjs/html-minifier",
      {
        log: "once",
        logHtml: true,
      },
    ],
    [
      "nuxt-font-loader-strategy",
      {
        ignoreLighthouse: true,
        ignoredEffectiveTypes: ["2g", "slow-2g"],
        fonts: [
          // Font
          {
            fileExtensions: ["ttf"],
            fontFamily: "metropolis Regular",
            fontFaces: [
              // Font-Face
              {
                preload: true,
                local: ["Regular"],
                src: "@/static/fonts/metropolis.regular",
              },
            ],
          },
          {
            fileExtensions: ["ttf"],
            fontFamily: "metropolis SemiBold",
            fontFaces: [
              // Font-Face
              {
                preload: true,
                local: ["SemiBold"],
                src: "@/static/fonts/metropolis.semi-bold",
              },
            ],
          },
          {
            fileExtensions: ["ttf"],
            fontFamily: "metropolis Bold",
            fontFaces: [
              // Font-Face
              {
                preload: true,
                local: ["Bold"],
                src: "@/static/fonts/metropolis.bold",
              },
            ],
          },
          {
            fileExtensions: ["ttf"],
            fontFamily: "metropolis Light",
            fontFaces: [
              // Font-Face
              {
                preload: true,
                local: ["Light"],
                src: "@/static/fonts/metropolis.light",
              },
            ],
          },
        ],
      },
    ],
  ],
  fontawesome: {
    component: "Fa",
    suffix: false,
    icons: {
      solid: true,
    },
  },
  cache: {
    useHostPrefix: false,
    pages: [
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      "/",
    ],

    key(route, context) {
      // custom function to return cache key, when used previous
      // properties (useHostPrefix, pages) are ignored. return
      // falsy value to bypass the cache
    },

    store: {
      type: "memory",

      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.
      max: 100,

      // number of seconds to store this page in cache
      ttl: 60,
    },
  },

  //Green sock module
  gsap: {
    /* Module Options */
  },

  // Add global page transition
  pageTransition: {
    name: "page",
    mode: "out-in",
    css: false,

    beforeEnter(el) {
      this.$gsap.set(el, {
        x: "-100%",
        opacity: 0,
      });
    },

    enter(el, done) {
      this.$gsap.to(el, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: done,
      });
    },

    leave(el, done) {
      this.$gsap.to(el, {
        opacity: 0,
        y: "100%",
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: done,
      });
    },
  },

  //Module nuxt compress
  "nuxt-compress": {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    },
  },
  //I18N Module
  i18n: {
    strategy: "prefix",
    defaultLocale: "en",
    langDir: "locales/",
    skipSettingLocaleOnNavigate: true,
    skipNuxtState: true,
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.js",
        dir: "ltr",
      },
      //Make sure that default locale is the last one!
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: true,
  },
  proxy: {
    "/api/": {
      target: "https://olympia-api.phoinix.ai/",
      pathRewrite: { "^/api/": "" },
      changeOrigin: true,
    },
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.node = {
        fs: "empty",
      };
    },
    optimization: {
      splitChunks: {
        chunks: "async",
      },
    },
    splitChunks: {
      pages: false,
      vendor: false,
      commons: false,
      runtime: false,
      layouts: false,
    },
  },
};
