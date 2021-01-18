// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');
const { makeFile } = require('../file');
const { makeConstFileText } = require('../generators/file-generators');
const { kebab } = require('../name-ops');

async function makeConstFile(extensionPath, folder, stateName) {
  try {
    const constText = await makeConstFileText(extensionPath, stateName);
    const constFile = makeFile(`${folder}/${kebab(stateName)}.const.ts`);
    await constFile.write(constText);
  } catch (e) {
    vscode.window.showErrorMessage(`Error in ${kebab(stateName)}.const.ts file creation: ${e.message}`);
  }
}

async function executeCreateStateCommand(context, folderUri, stateName) {
  Promise.all(
    [
      makeConstFile(context.extensionPath, folderUri.fsPath, stateName),
    ],
  ).catch((v) => vscode.window.showErrorMessage(`Error in state creation ${v}`));
}

module.exports = {
  executeCreateStateCommand,
};
