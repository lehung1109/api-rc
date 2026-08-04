import { exec } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const execAsync = promisify(exec);

function generateClientRegistryPlugin(): Plugin {
  let pending: Promise<void> | undefined;

  return {
    name: "generate-client-registry",
    async buildStart() {
      if (!pending) {
        pending = execAsync("bun run scripts/generate-client-registry.ts")
          .then(({ stdout, stderr }) => {
            if (stdout?.trim()) console.log(stdout.trim());
            if (stderr?.trim()) console.error(stderr.trim());
          })
          .finally(() => {
            pending = undefined;
          });
      }

      await pending;
    },
  };
}

function browserPostBuildPlugin(): Plugin {
  let shouldRunPostBuild = false;

  return {
    name: "browser-post-build",
    configResolved(config: ResolvedConfig) {
      shouldRunPostBuild = path.resolve(config.build.outDir) === path.resolve(process.cwd(), "dist");
    },
    async writeBundle() {
      if (!shouldRunPostBuild) {
        return;
      }

      console.log("Running browser post-build commands...");
      const [htmlResult, versionResult, restartResult] = await Promise.all([
        execAsync("bun run scripts/generate-html.ts"),
        execAsync("bun run scripts/generate-version-json.ts"),
        execAsync("bun run scripts/generate-restart-txt.ts"),
      ]);

      const copyResult = await execAsync("bun run copy.ts");

      for (const { stdout, stderr } of [
        copyResult,
        htmlResult,
        versionResult,
        restartResult,
      ]) {
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
      }

      console.log("Browser post-build commands completed successfully");
    },
  };
}

export default defineConfig({
  plugins: [tsconfigPaths(), generateClientRegistryPlugin(), browserPostBuildPlugin()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: false,
    modulePreload: false,
    rollupOptions: {
      input: {
        "react-loader": "src/react-loader.tsx",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].[hash].js",
        manualChunks(id) {
          const normalizedId = id.split(path.sep).join("/");

          if (
            normalizedId.includes("/node_modules/react/") ||
            normalizedId.includes("/node_modules/react-dom/") ||
            normalizedId.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((name) => name.endsWith(".css"))) {
            return "react-loader.css";
          }

          return "[name].[hash][extname]";
        },
      },
    },
  },
});