module.exports = {
  publicPath: './',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1/',
        ws: true,
        changeOrigin: true
      },
    }
  }
};