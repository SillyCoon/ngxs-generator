const { makeTemplate } = require('../template');
const { lowerFirstChar } = require('../name-ops');

const templates = {
  actionStateFunction: 'action-state-function',
};

function makeStateGenerator(extensionPath, actionName, stateName) {
  return ({
    extensionPath,
    stateName,

    async makeActionStateFunction() {
      const template = makeTemplate(this.extensionPath, templates.actionStateFunction);
      return template.fill([actionName, lowerFirstChar(actionName), stateName, actionName]);
    },

  });
}

module.exports = {
  makeStateGenerator,
};
