const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        include: path.resolve(__dirname, '../src')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src/')
    }
  },
}

