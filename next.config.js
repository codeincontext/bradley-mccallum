const webpack = require('webpack')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CONTENTFUL_SPACE': JSON.stringify(process.env.CONTENTFUL_SPACE),
        'process.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN)
      })
    )

    return config
  }
}
