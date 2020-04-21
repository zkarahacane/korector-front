module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/client': {
        target: 'http://localhost:8080',
      }
    }
  },
}