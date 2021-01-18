// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');
const { makeFile } = require('../file');
const { makeActionGenerator } = require('../generators/action-generator');
const { appendActionTo } = require('../parsers/action-parser');
const { makeStateGenerator } = require('../generators/state-generator');
const { appendActionFunction } = require('../parsers/state-parser');
const { makeImportGenerator } = require('../generators/import-generator');
const { appendImport } = require('../parsers/import-parser');

async function fillStateFile(path, actionName, stateName, extensionPath) {
  try {
    const file = makeFile(path);
    const text = await file.getText();

    const stateGenerator = makeStateGenerator(extensionPath, actionName, stateName);
    const actionFunction = await stateGenerator.makeActionStateFunction();
    const stateWithActionFunction = appendActionFunction(text, actionFunction, stateName);

    const importGenerator = makeImportGenerator(extensionPath, actionName, stateName);
    const importStatement = await importGenerator.makeImportStatement();
    const completeState =
      appendImport(stateWithActionFunction, importStatement, stateName, actionName);

    await file.write(completeState);
  } catch (e) {
    vscode.window.showErrorMessage(`Error during state action function creation: ${e}`);
  }
}

async function fillActionFile(path, actionName, stateName, extensionPath) {
  try {
    const actionGenerator = makeActionGenerator(extensionPath, actionName, stateName);

    const file = makeFile(path);
    const text = await file.getText();

    const type = await actionGenerator.makeActionType();
    const model = await actionGenerator.makeActionModel();

    const textWithAction = appendActionTo(text, type, model);

    await file.write(textWithAction);

    await vscode.window.showTextDocument(await file.getVsCodeFile(), { preview: false });

    vscode.window.showInformationMessage(`Action ${actionName} successfully created!`);
  } catch (e) {
    vscode.window.showErrorMessage(`Error during action creation: ${e}`);
  }
}

async function executeCreateActionCommand(context, actionsFileUri, actionName, stateName) {
  const stateFileUri = actionsFileUri.fsPath.replace('actions.ts', 'state.ts');

  await fillActionFile(actionsFileUri.fsPath, actionName, stateName, context.extensionPath);
  await fillStateFile(stateFileUri, actionName, stateName, context.extensionPath);
}

module.exports = {
  executeCreateActionCommand,
}