import crypto from "node:crypto";
import path from "node:path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

/** Ghi dist/version.json với hash JS + CSS (đổi khi bundle hoặc style đổi). */
class WriteVersionJsonPlugin {
  constructor(options = {}) {
    this.bundleFile = options.bundleFile ?? "react-loader.js";
    this.cssFile = options.cssFile ?? "react-loader.css";
    this.versionFile = options.versionFile ?? "version.json";
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(
      "WriteVersionJsonPlugin",
      (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: "WriteVersionJsonPlugin",
            stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          (assets) => {
            const hash = crypto.createHash("sha256");

            for (const file of [this.bundleFile, this.cssFile]) {
              const source = assets[file];
              if (!source) continue;

              const raw = source.source();
              const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
              hash.update(buffer);
            }

            const version = hash.digest("hex").slice(0, 12);

            const payload = JSON.stringify(
              {
                version,
                file: this.bundleFile,
                cssFile: this.cssFile,
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
      },
    );
  }
}

class ConcatPlugin {
  constructor({
    copyCommand = "bun run copy.ts",
    htmlCommand = "bun run scripts/generate-html.ts",
  } = {}) {
    this.copyCommand = copyCommand;
    this.htmlCommand = htmlCommand;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync("ConcatPlugin", async (_stats, callback) => {
      try {
        console.log("Running post-build commands...");
        const [copyResult, htmlResult] = await Promise.all([
          execAsync(this.copyCommand),
          execAsync(this.htmlCommand),
        ]);

        for (const { stdout, stderr } of [copyResult, htmlResult]) {
          if (stdout) console.log(stdout);
          if (stderr) console.error(stderr);
        }

        console.log("Post-build commands completed successfully");
        callback();
      } catch (error) {
        console.error("Error running post-build commands:", error);
        callback(error);
      }
    });
  }
}

export default (_env, { watch }) => ({
  mode: "development",
  entry: {
    "react-loader": "./src/react-loader.tsx",
    styles: "./src/styles.css",
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].js",
    clean: !watch,
  },
  watchOptions: {
    ignored: ["**/html/**", "**/node_modules/**"],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(process.cwd(), "src"),
      "@components": path.resolve(process.cwd(), "src", "components"),
    },
  },
  devtool: false,
  devServer: {
    static: path.resolve(process.cwd(), "dist"),
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            onlyCompileBundledFiles: true,
            compilerOptions: {
              declaration: false,
              declarationMap: false,
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: ({ chunk }) =>
        chunk.name === "styles" ? "react-loader.css" : "[name].css",
    }),
    new WriteVersionJsonPlugin(),
    new ConcatPlugin(),
  ],
});
