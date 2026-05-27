import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

/** Sinh src/generated/client-registry.ts trước mỗi lần compile (kể cả watch rebuild). */
class GenerateClientRegistryPlugin {
  constructor({
    command = "bun run scripts/generate-client-registry.ts",
  } = {}) {
    this.command = command;
    this.pending = null;
  }

  run() {
    if (!this.pending) {
      this.pending = execAsync(this.command)
        .then(({ stdout, stderr }) => {
          if (stdout?.trim()) console.log(stdout.trim());
          if (stderr?.trim()) console.error(stderr.trim());
        })
        .finally(() => {
          this.pending = null;
        });
    }
    return this.pending;
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise(
      "GenerateClientRegistryPlugin",
      () => this.run(),
    );
  }
}

class ConcatPlugin {
  constructor({
    copyCommand = "bun run copy.ts",
    htmlCommand = "bun run scripts/generate-html.ts",
    versionCommand = "bun run scripts/generate-version-json.ts",
  } = {}) {
    this.copyCommand = copyCommand;
    this.htmlCommand = htmlCommand;
    this.versionCommand = versionCommand;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync("ConcatPlugin", async (_stats, callback) => {
      try {
        console.log("Running post-build commands...");
        const [htmlResult, versionResult] = await Promise.all([
          execAsync(this.htmlCommand),
          execAsync(this.versionCommand),
        ]);

        const copyResult = await execAsync(this.copyCommand);

        for (const { stdout, stderr } of [
          copyResult,
          htmlResult,
          versionResult,
        ]) {
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
    ignored: ["**/html/**", "**/node_modules/**", "**/src/generated/**"],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(process.cwd(), "src"),
      "@components": path.resolve(process.cwd(), "src", "components"),
    },
  },
  devtool: "source-map",
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
    new GenerateClientRegistryPlugin(),
    new MiniCssExtractPlugin({
      filename: ({ chunk }) =>
        chunk.name === "styles" ? "react-loader.css" : "[name].css",
    }),
    new ConcatPlugin(),
  ],
});
