const { build } = require('esbuild');

const { globPlugin } = require('esbuild-plugin-glob');

build({
  entryPoints: ['src/**/*.{tsx,ts}'],
  outdir: './dist',
  platform: 'browser',
  target: 'es6',
  plugins: [globPlugin()],
  metafile: true,
})
  .then((res) => console.log(res, 'all done'))
  .catch((e) => console.error(e))
  .finally(() => process.exit(0));
