import path from 'node:path';

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
};