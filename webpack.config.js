import crypto from "node:crypto";
import path from "node:path";
import webpack from "webpack";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

/** Ghi dist/version.json với hash nội dung react-loader.js (đổi khi bundle đổi). */
class WriteVersionJsonPlugin {
  constructor(options = {}) {
    this.bundleFile = options.bundleFile ?? "react-loader.js";
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
            const source = assets[this.bundleFile];
            if (!source) return;

            const raw = source.source();
            const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
            const version = crypto
              .createHash("sha256")
              .update(buffer)
              .digest("hex")
              .slice(0, 12);

            const payload = JSON.stringify(
              {
                version,
                file: this.bundleFile,
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
    htmlCommand = "bun run server.ts",
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
  entry: "./src/react-loader.tsx",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "react-loader.js",
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new WriteVersionJsonPlugin(), new ConcatPlugin()],
});
