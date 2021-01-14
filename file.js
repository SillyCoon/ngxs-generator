const fs = require('fs').promises;
// eslint-disable-next-line import/no-unresolved
const vscode = require('vscode');

function makeFile(path) {
  return ({
    async getVsCodeFile() {
      const uri = vscode.Uri.file(path);
      return vscode.workspace.openTextDocument(uri);
    },

    async getText() {
      return (await this.getVsCodeFile()).getText();
    },

    async write(text) {
      return fs.writeFile(path, text);
    },
  });
}

module.exports = {
  makeFile,
};
