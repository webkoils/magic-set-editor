const path = require('path');
const watch = !!process.argv[2];

const { build } = require('esbuild');

const rootDir = path.resolve(process.cwd());
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const packageJson = require(path.join(rootDir, 'package.json'));
const esbuildConfig = packageJson.esbuild;

const entryPoints = esbuildConfig.entryPoints;
const shared = {
  bundle: true,
  entryPoints: entryPoints,
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  plugins: [
    nodeExternalsPlugin({ allowList: esbuildConfig.alwaysBundle || [] }),
  ],
  logLevel: 'info',
  minify: true,
  sourcemap: true,
};

build({
  ...shared,
  format: 'esm',

  outdir: path.join(rootDir, './dist'),
  entryNames: '[name].esm',
  target: ['esnext', 'node12.22.0'],
  watch,
});

build({
  ...shared,
  format: 'cjs',

  outdir: path.join(rootDir, './dist'),
  entryNames: '[name].cjs',
  target: ['esnext', 'node12.22.0'],
  watch,
});
