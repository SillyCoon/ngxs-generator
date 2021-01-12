// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

// node version - 12.14.1

const vscode = require('vscode');
const fs = require('fs').promises;
const { helpers } = require('./action-generator');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const action = vscode.commands.registerCommand('ngxs-generator.makeAction', async (actionsFileUri) => {
    const actionName = await vscode.window.showInputBox({ placeHolder: 'here is your ActionName...' }) || 'MyAction';
    if (verifyActionName(actionName)) {
      const stateName = extractStateNameFromUri(actionsFileUri);

      if (stateName) {
        await fillActionFile(actionsFileUri, actionName, stateName);
      } else {
        vscode.window.showErrorMessage('Wrong file selected! Please select "my-actions.actions.ts"');
      }
    } else {
      vscode.window.showErrorMessage(`Wrong action name ${actionName}`);
    }
  });

  context.subscriptions.push(action);
}

module.exports = {
  activate,
};

function extractStateNameFromUri(uri) {
  if (!uri) return null;
  const splitted = uri.fsPath.split('/');
  const actionsFileName = splitted[splitted.length - 1];
  const splittedActionFileName = actionsFileName.split('.');
  if (splittedActionFileName[1] !== 'actions') {
    return null;
  }
  const kebabStateName = splittedActionFileName[0];
  return kebabStateName[0].toUpperCase()
    + kebabStateName.replace(/-\w/, chars => chars[1].toUpperCase()).slice(1);
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

async function fillActionFile(uri, actionName, stateName) {
  try {
    const [
      pascalActionName,
      upperSnakeActionName,
      sentenceActionName,
    ] = helpers.makeActionNameInNeededNotations(actionName);

    const file = await vscode.workspace.openTextDocument(uri);
    const text = file.getText();
    const textWithActionType = addActionType(text, upperSnakeActionName, stateName, sentenceActionName);
    const completeActionText = addActionModel(textWithActionType, pascalActionName, upperSnakeActionName);

    await fs.writeFile(uri.fsPath, completeActionText);

    await vscode.window.showTextDocument(file, { preview: false });

    vscode.window.showInformationMessage(`Action ${actionName} successfully created!`);
  } catch (e) {
    vscode.window.showErrorMessage(`Error during action creation: ${e}`);
  }

  function addActionType(txt, key, stateId, name) {
    const actionType = helpers.makeActionTypeString(key, stateId, name);
    return txt.replace(/enum ActionTypes\s*{/g, keep => `${keep} \n  ${actionType},`);
  }

  function addActionModel(txt, name, typeKey) {
    const actionModel = helpers.makeActionModel(name, typeKey);
    return `${txt.trim()}\n\n${actionModel}`;
  }
}
