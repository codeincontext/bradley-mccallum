const webpack = require('webpack');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  target: 'serverless',

  env: {
    CONTENTFUL_SPACE: JSON.stringify(process.env.CONTENTFUL_SPACE),
    CONTENTFUL_ACCESS_TOKEN: JSON.stringify(
      process.env.CONTENTFUL_ACCESS_TOKEN
    ),
    CONTENTFUL_PREVIEW_TOKEN: JSON.stringify(
      process.env.CONTENTFUL_PREVIEW_TOKEN
    ),
  },
};
