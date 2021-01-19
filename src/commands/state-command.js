// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');
const { makeFile } = require('../file');
const { makeConstFileText,
  makeStateFileText,
  makeActionsFileText,
  makeModuleFileText,
  makeSelectorsFileText } = require('../generators/file-generator');
const { kebab } = require('../name-ops');

async function executeCreateStateCommand(context, folderUri, stateName) {
  Promise.all(
    fileWriters.map(writer => writer(context.extensionPath, folderUri.fsPath, stateName)),
  ).catch((v) => vscode.window.showErrorMessage(`Error in state creation ${v}`));
}

const fileWriters = [
  async function writeConstFile(extensionPath, folder, stateName) {
    const text = await makeConstFileText(extensionPath, stateName);
    return writeFile(folder, makeFileName(kebab(stateName), 'const'), text);
  },
  async function writeActionsFile(extensionPath, folder, stateName) {
    const text = await makeActionsFileText(extensionPath);
    return writeFile(folder, makeFileName(kebab(stateName), 'actions'), text);
  },
  async function writeModuleFile(extensionPath, folder, stateName) {
    const text = await makeModuleFileText(extensionPath, stateName);
    return writeFile(folder, makeFileName(`${kebab(stateName)}-state`, 'module'), text);
  },
  async function writeStateFile(extensionPath, folder, stateName) {
    const text = await makeStateFileText(extensionPath, stateName);
    return writeFile(folder, makeFileName(kebab(stateName), 'state'), text);
  },
  async function writeSelectorsFile(extensionPath, folder, stateName) {
    const text = await makeSelectorsFileText(extensionPath, stateName);
    return writeFile(folder, makeFileName(kebab(stateName), 'selectors'), text);
  },
];

async function writeFile(folder, name, text) {
  try {
    const file = makeFile(`${folder}/${name}`);
    await file.write(text);
  } catch (e) {
    vscode.window.showErrorMessage(`Error in ${name} file creation: ${e.message}`);
  }
}

function makeFileName(fileName, fileType) {
  return `${fileName}.${fileType}.ts`;
}

module.exports = {
  executeCreateStateCommand,
};
