const { merge } = require('webpack-merge');

module.exports = (config) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [
                    'libs/common/ui/styles'
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  });
};