const { emptyDirSync } = require('fs-extra');
const fs = require('fs-extra');
const path = require('path');
const createManifests = () => {
  const manifests = {};
  emptyDirSync(path.join(__dirname, 'dist'));
  const templateFolders = fs.readdirSync(path.join(__dirname, 'templates'));
  templateFolders.forEach((templateFolder) => {
    if (
      !fs
        .statSync(path.join(__dirname, 'templates', templateFolder))
        .isDirectory()
    )
      return;
    const manifestAssets = {};
    fs.readdirSync(path.join(__dirname, 'templates', templateFolder))
      .filter((fname) => fname.match(/.+?\.(jpg|png|svg)$/i))
      .forEach((fname) => {
        fs.ensureSymlinkSync(
          path.join(__dirname, 'templates', templateFolder, fname),

          path.join(__dirname, 'dist', templateFolder, fname),
          'file'
        );
        manifestAssets[
          fname.replace(/\.(jpg|png|svg)$/i, '').replace(/[^0-9a-z_]/gi, '')
        ] = `${templateFolder}/${fname}`;
      });
    fs.outputFileSync(
      path.join(__dirname, 'dist', templateFolder, 'index.ts'),
      `export const ${templateFolder
        .replace(/[^0-9a-z]/gi, '_')
        .toUpperCase()}_ASSETS = ` +
        JSON.stringify(manifestAssets) +
        ';'
    );
    manifests[templateFolder] = `./${templateFolder}`;
  });
  fs.outputFileSync(
    path.join(__dirname, 'dist', 'index.ts'),
    Object.entries(manifests)
      .map(([k, v]) => `export * from "${v}"`)
      .join('\n')
  );
};
createManifests();
