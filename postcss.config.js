/** @type {import('postcss-load-config').Config} */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const stylesPath = path.resolve('src/styles.css');

function getPackageName(importId) {
  if (/^(?:\.|\/|[a-z]+:)/i.test(importId)) {
    return undefined;
  }

  const parts = importId.split('/');

  return importId.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

function getImportedPackageRoots(filePath) {
  const css = fs.readFileSync(filePath, 'utf8');
  const packageNames = new Set(
    [...css.matchAll(/^@import\s+["']([^"']+)["']/gm)]
      .map((match) => getPackageName(match[1]))
      .filter(Boolean),
  );

  return [...packageNames]
    .map((packageName) => {
      try {
        return path.dirname(require.resolve(`${packageName}/package.json`));
      } catch {
        return undefined;
      }
    })
    .filter(Boolean);
}

function resolveImportedPackageAsset(asset, dir) {
  if (!asset.pathname) {
    return asset.url;
  }

  const importedPackageRoots = getImportedPackageRoots(stylesPath);
  const assetPath = asset.pathname.replace(/^\.\//, '');
  const sourcePath = importedPackageRoots
    .map((packageRoot) => path.resolve(packageRoot, assetPath))
    .find((candidatePath) => fs.existsSync(candidatePath));

  if (!sourcePath) {
    return asset.url;
  }

  return path.relative(dir.file, sourcePath).replaceAll(path.sep, '/');
}

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-url': {
      filter: '**/*.{eot,otf,ttf,woff,woff2}',
      url: resolveImportedPackageAsset,
    },
  },
};
