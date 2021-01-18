// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');
const { makeFile } = require('../file');
const { creators, templates } = require('../generators/file-generator');
const { kebab } = require('../name-ops');

async function makeConstFile(extensionPath, folder, stateName) {
  makeStateStructureFile(extensionPath, folder, stateName, 'const', makeConstFileText);
}

async function makeStateStructureFile(extensionPath, folder, stateName, fileType, textMaker) {
  try {
    const text = await textMaker(extensionPath, stateName);
    const file = makeFile(`${folder}/${kebab(stateName)}.${fileType}.ts`);
    await file.write(text);
  } catch (e) {
    vscode.window.showErrorMessage(`Error in ${kebab(stateName)}.${fileType}.ts file creation: ${e.message}`);
  }
}

async function executeCreateStateCommand(context, folderUri, stateName) {
  Promise.all(
    Object.keys(templates).map((fileType, i) => {
      return makeStateStructureFile(context.extensionPath, folderUri.fsPath, stateName, fileType, creators[i]);
    }),
  ).catch((v) => vscode.window.showErrorMessage(`Error in state creation ${v}`));
}

module.exports = {
  executeCreateStateCommand,
};
