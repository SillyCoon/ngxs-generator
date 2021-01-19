const { makeTemplate } = require('../template');
const { upperSnake, kebab } = require('../name-ops');

const templates = {
  const: 'files/const',
  state: 'files/state',
  actions: 'files/actions',
  module: 'files/module',
  selectors: 'files/selectors',
};

function makeConstFileText(extensionPath, stateName) {
  const template = makeTemplate(extensionPath, templates.const);
  return template.fill([upperSnake(stateName), upperSnake(stateName)]);
}

function makeStateFileText(extensionPath, stateName) {
  const template = makeTemplate(extensionPath, templates.state);
  return template.fill([kebab(stateName), stateName, stateName, stateName, stateName]);
}

function makeActionsFileText(extensionPath) {
  const template = makeTemplate(extensionPath, templates.actions);
  return template.fill([]);
}

function makeModuleFileText(extensionPath, stateName) {
  const template = makeTemplate(extensionPath, templates.module);
  return template.fill([stateName, kebab(stateName), stateName, stateName]);
}

function makeSelectorsFileText(extensionPath, stateName) {
  const template = makeTemplate(extensionPath, templates.selectors);
  return template.fill([stateName]);
}

module.exports = {
  makeConstFileText,
  makeStateFileText,
  makeActionsFileText,
  makeModuleFileText,
  makeSelectorsFileText,
};
