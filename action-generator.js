const { makeTemplate } = require('./template');
const { sentence } = require('./name-ops');

const templates = {
  actionModel: 'action-model',
  actionType: 'action-type',
};

function makeActionGenerator(extensionPath, actionName, stateName) {
  return ({
    extensionPath,
    actionName,
    stateName,

    get sentenceActionName() {
      return sentence(this.actionName);
    },

    async makeActionModel() {
      const template = makeTemplate(this.extensionPath, templates.actionModel);
      return template.fill([this.actionName, this.actionName]);
    },

    async makeActionType() {
      const template = makeTemplate(this.extensionPath, templates.actionType);
      return template.fill([this.actionName, this.stateName, this.sentenceActionName]);
    },

  });
}

module.exports = {
  makeActionGenerator,
};
