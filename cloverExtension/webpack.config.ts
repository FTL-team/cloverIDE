import * as path from 'path'
import * as webpack from 'webpack'
import { tools } from './src/tools'

const viewEntries: { [key: string]: string } = {}

tools.forEach((e) => {
  viewEntries[e.viewType] = `./src/views/${e.viewType}.tsx`
})

const tsLoader = {
  test: /\.(ts|tsx)$/,
  loader: 'ts-loader',
  options: {}
}

const config: webpack.Configuration[] = [
  {
    target: 'node',
    entry: './src/extension.ts',
    output: {
      path: path.resolve(__dirname, 'out'),
      filename: 'extension.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json']
    },
    externals: {
      vscode: 'commonjs vscode'
    },
    module: {
      rules: [tsLoader]
    }
  },
  {
    entry: viewEntries,
    output: {
      path: path.resolve(__dirname, 'out', 'ui'),
      filename: '[name].js'
    },
    devtool: 'eval-source-map',
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
      alias: {
        webworkify: 'webworkify-webpack',
        '../util/cborTypedArrayTags': path.resolve(__dirname, 'roslibCBOR.js')
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          }
        }
      }
    },
    externals: {
      fs: '{}',
      crypto: '{}',
      path: '{}'
    },
    experiments: {
      topLevelAwait: true
    },
    module: {
      rules: [
        tsLoader,
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.html$/i,
          loader: 'html-loader'
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ]
    }
  }
]

export default config
