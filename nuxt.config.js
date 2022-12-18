module.exports = {
  srcDir: "src/",
  generate: {
    dir: ".app",
  },

  ssr: false,
  config: {
    nuxt: {
      host: "0.0.0.0",
      port: 33333,
    },
  },

  middleware: "auth",

  components: true,

  axios: {
    //proxy: true
    baseURL: process.env.API_URL,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_productName || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  /*
   ** Customize the progress-bar color
   */

  /*
   ** Global CSS
   */
  css: ["@/assets/scss/main.scss"],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
  ],
  /*
   ** Plugins to load before mounting the App

   */
  plugins: [
    "~plugins/filter.js",
    "~plugins/diriectiv.js",
    "~plugins/axios",
    "~plugins/printing.js",
    // "~plugins/getItems.js",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],

  // moment: {
  //   locales: ["en-US"],
  // },
  /*
   ** Nuxt.js modules
   */

  // Build Configuration: auth
  auth: {
    redirect: {
      login: "/",
      logout: "/",
      home: "/homePage",
    },

    strategies: {
      local: {
        token: {
          type: "",
          global: true,
          maxAge: 60 * 62 * 24,
        },
        user: {
          property: "",
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: "authorization",
            method: "post",
          },
          user: {
            url: "authorization/user",
            method: "get",
          },
          logout: {
            url: "authorization/logout",
            method: "get",
          },
        },
      },
    },
  },

  /*
   ** Build configuration
   */
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: "empty",
        child_process: "empty",
      };

      // ....
    },

    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]],
    },
    postcss: null,
    devtools: false,
    /*
     ** You can extend webpack config here
     */
    loaders: {
      scss: {
        implementation: require("sass"),
      },
    },
  },

  // serverMiddleware: ["api/server.js"],
};
