const { makeTemplate } = require('../template');
const { upperSnake } = require('../name-ops');

const templates = {
  const: 'files/const',
  state: 'files/state',
  actions: 'files/actions',

};

function makeConstFileText(extensionPath, stateName) {
  const template = makeTemplate(extensionPath, templates.const);
  return template.fill([upperSnake(stateName), upperSnake(stateName)]);
}

function makeStateFileText(extensionPath, stateName) {
  const template = makeTemplate(extensionPath, templates)
}

module.exports = {
  makeConstFileText,
};
