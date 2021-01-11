// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ngxs-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ngxs-generator.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Oh shit Im sorry!');
  });

  let action = vscode.commands.registerCommand('ngxs-generator.makeAction', async (actionsFileUri) => {

    const actionName = await vscode.window.showInputBox({placeHolder: 'here is your ActionName...'});
    if (verifyActionName(actionName)) {
      const [upperCamelCaseActionName, upperSnakeCaseActionName, sentenceActionName] = makeActionNameInNeededNotations(actionName);

      const stateName = parseStateNameFromUri(actionsFileUri || '');

      if (stateName) {
        vscode.window.showInformationMessage(stateName);
      } else {
        vscode.window.showErrorMessage('Some error just happened!');
      }
    }
  });

	context.subscriptions.push(disposable, action);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

function makeActionNameInNeededNotations(actionName) {
  return [actionName, toUpperSnakeCase(actionName), toSentence(actionName)];

  function toUpperSnakeCase(str) {
    return str.replace(/[A-Z]/g, c => `_${c}`).slice(1).toUpperCase();
  }

  function toSentence(str) {
    return str.replace(/[A-Z]/g, c => ` ${c}`);
  }
}

function parseStateNameFromUri(uri) {
  const splitted = uri.fsPath.split('/');
  const actionsFileName = splitted[splitted.length - 1];
  const splittedActionFileName = actionsFileName.split('.');
  if (splittedActionFileName[1] !== 'actions') {
    vscode.window.showErrorMessage('Wrong file selected! Please select "my-actions.actions.ts"');
  } else {
    const kebabStateName = splittedActionFileName[0];
    return kebabStateName[0].toUpperCase() +
           kebabStateName.replace(/-\w/, chars => chars[1].toUpperCase()).slice(1);
  }
}

function verifyActionName(name) {
  if (!name || !isUpperCamelCase(name)) {
    vscode.window.showErrorMessage(`Wrong action name ${name}! Please use UpperCamelCase`);
    return false;
  } else {
    return true;
  }

  function isUpperCamelCase(str) {
    return /^[A-Z][A-Za-z]*$/.test(str);
  }
}
