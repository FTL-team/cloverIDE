const path = require('path')

module.exports = [
  {
    target: 'node',
    entry: './src/extension.ts',
    output: {
      path: path.resolve(__dirname, 'out'),
      filename: 'extension.js',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    externals: {
      vscode: 'commonjs vscode',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          options: {},
        },
      ],
    },
  },
  {
    entry: {
      topicVisView: './src/views/topicView.tsx',
      imageVisView: './src/views/imageView.tsx',
      serviceCallerView: './src/views/serviceCaller.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'out', 'ui'),
      filename: '[name].js',
    },
    devtool: 'eval-source-map',
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          options: {},
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    },
  },
]
