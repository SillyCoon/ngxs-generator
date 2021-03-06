// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

// node version - 12.14.1

// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');
const { executeCreateActionCommand } = require('./src/commands/action-command');
const { executeCreateStateCommand } = require('./src/commands/state-command');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const action = vscode.commands.registerCommand('ngxs-generator.makeAction', async (actionsFileUri) => {
    const actionName = await vscode.window.showInputBox({ placeHolder: 'here is your ActionName...' }) || 'MyAction';

    if (verifyActionName(actionName)) {
      const stateName = extractStateNameFromUri(actionsFileUri.fsPath);

      if (stateName) {
        executeCreateActionCommand(context, actionsFileUri, actionName, stateName);
      } else {
        vscode.window.showErrorMessage('Wrong file selected! Please select "my-actions.actions.ts"');
      }
    } else {
      vscode.window.showErrorMessage(`Wrong action name ${actionName}`);
    }
  });

  const state = vscode.commands.registerCommand('ngxs-generator.makeState', async (stateFolderUri) => {
    const stateName = await vscode.window.showInputBox({ placeHolder: 'here is your StateName...' }) || 'MyState';

    if (stateName) {
      await executeCreateStateCommand(context, stateFolderUri, stateName);
      vscode.window.showInformationMessage('State was successfully created!');
    } else {
      vscode.window.showErrorMessage(`Wrong state name ${stateName}!`);
    }
  });

  context.subscriptions.push(action, state);
}

function extractStateNameFromUri(uri) {
  if (!uri) return null;
  const splitted = uri.split('/');
  const actionsFileName = splitted[splitted.length - 1];
  const splittedActionFileName = actionsFileName.split('.');
  if (splittedActionFileName[1] !== 'actions') {
    return null;
  }
  const kebabStateName = splittedActionFileName[0];
  return kebabStateName[0].toUpperCase()
    + kebabStateName.replace(/-\w/g, chars => chars[1].toUpperCase()).slice(1);
}

function verifyActionName(name) {
  function isUpperCamelCase(str) {
    return /^[A-Z][A-Za-z]*$/.test(str);
  }

  if (!name || !isUpperCamelCase(name)) {
    vscode.window.showErrorMessage(`Wrong action name ${name}! Please use UpperCamelCase`);
    return false;
  }
  return true;
}

module.exports = {
  activate,
  extractStateNameFromUri,
};
