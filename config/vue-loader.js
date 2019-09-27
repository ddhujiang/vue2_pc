module.exports = (isDev) => {
    return {
      preserveWhitepace: true, // remove the space
      extractCSS: !isDev, // parse css in vue, so that it can be packaged with ExtractPlugin
      // cssModules: {},
      // hotReload: false, //Generation based on environmental variables
      // loader: {
      //   'docs': docsLoader
      // } Custom the vue module
      preLoader: {}, // before vue-loader analysis
      postLoader: {}, // after vue-loader analysis
      cssModules: {
        localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[[path]-[name]-hash:base64:5]',
        camelCase: true// cover className to cameClase standard
      } // you want to use the cssModules you need to add 'module' in vue-style
    }
  }