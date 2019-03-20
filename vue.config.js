module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Inject sass abstract data as they will be available in all Vue compomnents
        data: `
          @import "@/sass/abstract/index.scss";
        `
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
