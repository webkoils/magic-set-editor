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
const { ensureDirSync } = require('fs-extra');
const buildTemplate = async () => {
  const inputDir = path.resolve(__dirname, '../generic');
  const { name, id } = readJsonSync(path.resolve(inputDir, 'config.json'));
  const outDir = path.resolve(__dirname, '..', id);
  emptyDirSync(outDir);
  const { templateFiles, assets } = listAssets(inputDir + '/files');
  ensureDirSync(path.resolve(outDir, 'converted'));
  ensureDirSync(path.resolve(outDir, 'files'));

  let filenames = await Promise.all(
    templateFiles
      .map((fname) =>
        convertTemplateFile(
          inputDir + '/files/' + fname,
          path.resolve(outDir, 'converted', fname + '.json')
        ).then(() => './converted/' + fname + '.json')
      )
      .concat(
        assets.map((fname) =>
          copyFile(
            inputDir + '/files/' + fname,
            path.resolve(outDir, 'files', fname)
          ).then(() => './files/' + fname)
        )
      )
  );
  outputFileSync(
    outDir + '/manifest.json',
    format(JSON.stringify(filenames), { parser: 'json-stringify' })
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
