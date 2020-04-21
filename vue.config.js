module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/client': {
        target: 'http://localhost:8080',
        ws:true,
        changeOrigin: true,
        xfwd: true
      },
      '/logout': {
        target: 'http://localhost:8080',
        ws:true,
        changeOrigin: true,
        xfwd: true
      },
      '/private': {
        target: 'http://localhost:8080',
        ws:true,
        changeOrigin: true,
        xfwd: true
      },
      '/oauth2/authorization/login-client': {
        target: 'http://localhost:8080',
        ws:true,
        changeOrigin: true,
        xfwd: true
      },
      '/login/oauth2/code/login-client': {
        target: 'http://localhost:8080',
        ws:true,
        changeOrigin: true,
        xfwd: true
      },

    }
  },
};