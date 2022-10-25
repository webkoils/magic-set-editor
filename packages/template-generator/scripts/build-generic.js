const { emptyDirSync } = require('fs-extra');
const path = require('path');
const { format } = require('prettier');
const { convertTemplateFile } = require('@mse/template-converter');
const {
  outputFileSync,
  copyFile,
  readJsonSync,
  readdirSync,
} = require('fs-extra');
const { camelCase } = require('change-case');
const { ensureDirSync } = require('fs-extra');
const buildTemplate = async () => {
  const inputDir = path.resolve(__dirname, '../generic');
  const { name, id } = readJsonSync(path.resolve(inputDir, 'config.json'));
  const outDir = path.resolve(__dirname, '..', id);
  emptyDirSync(outDir);
  const { templateFiles, assets } = listAssets(inputDir + '/files');
  ensureDirSync(path.resolve(outDir, 'converted'));
  ensureDirSync(path.resolve(outDir, 'files'));

  let [templateFilenames, assetsFilenames] = [
    await Promise.all(
      templateFiles.map((fname) =>
        convertTemplateFile(
          inputDir + '/files/' + fname,
          path.resolve(outDir, 'converted', fname + '.ts'),
          'ts'
        ).then(() => './converted/' + fname + '.ts')
      )
    ),
    await Promise.all(
      assets.map((fname) =>
        copyFile(
          inputDir + '/files/' + fname,
          path.resolve(outDir, 'files', fname)
        ).then(() => './files/' + fname)
      )
    ),
  ];
  let imports = templateFilenames.map((fname) => {
    return `export {default as ${camelCase(
      fname.replace('.ts', '')
    )}} from "${fname}";`;
  });
  outputFileSync(outDir + '/index.ts', imports.join('\n'));

  const packageJson = {
    name: '@mse/templates.' + id,
    version: '1.0.0',
    main: 'index.ts',
    types: 'index.ts',
    files: templateFilenames.concat(assetsFilenames),
  };
  outputFileSync(
    outDir + '/package.json',
    format(JSON.stringify(packageJson), { parser: 'json-stringify' })
  );
};

const listAssets = (fileDir) => {
  const files = readdirSync(fileDir);
  return {
    templateFiles: files.filter((fname) => fname.indexOf('.') === -1),
    assets: files.filter((fname) => fname.indexOf('.') !== -1),
  };
};
buildTemplate()
  .catch(console.error)
  .finally(() => process.exit(0));
