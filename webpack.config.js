import crypto from 'node:crypto';
import path from 'node:path';
import webpack from 'webpack';

/** Ghi dist/version.json với hash nội dung react-loader.js (đổi khi bundle đổi). */
class WriteVersionJsonPlugin {
  constructor(options = {}) {
    this.bundleFile = options.bundleFile ?? 'react-loader.js';
    this.versionFile = options.versionFile ?? 'version.json';
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('WriteVersionJsonPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'WriteVersionJsonPlugin',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          const source = assets[this.bundleFile];
          if (!source) return;

          const raw = source.source();
          const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
          const version = crypto
            .createHash('sha256')
            .update(buffer)
            .digest('hex')
            .slice(0, 12);

          const payload = JSON.stringify(
            {
              version,
              file: this.bundleFile,
              builtAt: new Date().toISOString(),
            },
            null,
            2,
          );

          compilation.emitAsset(
            this.versionFile,
            new webpack.sources.RawSource(`${payload}\n`),
          );
        },
      );
    });
  }
}

export default {
  mode: 'development',
  entry: './src/react-loader.tsx',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'react-loader.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@components': path.resolve(process.cwd(), 'src', 'components'),
    },
  },
  devtool: false,
  devServer: {
    static: path.resolve(process.cwd(), 'dist'),
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [new WriteVersionJsonPlugin()],
};