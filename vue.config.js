module.exports = {
  devServer: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        // target: 'http://10.11.56.164:8090/',
        //target: 'http://127.0.0.1:8090/',
        target: 'http://47.100.225.183:8090/',
=======
        target: 'http://10.11.56.159:8090/',
        // target: 'http://47.100.225.183:8090/',
>>>>>>> db717d48058ee26ff4c6dfd3a669cf1b9c85bd51
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
