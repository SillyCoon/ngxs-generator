const { makeTemplate } = require('./template');

const templates = {
  actionModel: 'action-model',
  actionType: 'action-type',
};

function makeActionGenerator(extensionPath, actionName, stateName) {
  return ({
    path: extensionPath,
    actionName,
    stateName,

    get sentenceActionName() {
      return this.actionName.replace(/[A-Z]/g, c => ` ${c}`);
    },

    async makeActionModel() {
      const template = makeTemplate(this.path, templates.actionModel);
      return template.fill([this.actionName, this.actionName]);
    },

    async makeActionType() {
      const template = makeTemplate(this.path, templates.actionType);
      return template.fill([this.actionName, this.stateName, this.sentenceActionName]);
    },

  });
}

module.exports = {
  makeActionGenerator,
};
