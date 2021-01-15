const { stat } = require("fs");

function appendActionFunction(text, actionFunction, stateName) {
  const pattern = makeAppendPattern(stateName);
  return text.replace(pattern, (v) => `${v.trim()}\n${actionFunction}\n\n`);
}

function makeAppendPattern(stateName) {
  const regexpString = `class \+${stateName}State\\s\*\{\\s\*\\n`;
  return new RegExp(regexpString, 'gm');
}

module.exports = {
  appendActionFunction,
};
