module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api'
        },
      },
    }
  }
}
