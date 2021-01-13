const fs = require('fs').promises;

const templates = {
  actionModel: 'action-model',
  actionType: 'action-type',
};

function makeActionGenerator(extensionPath, actionName, stateName) {
  const templateWorker = makeTemplateWorker();

  return ({
    path: extensionPath,
    actionName,
    stateName,

    get sentenceActionName() {
      return this.actionName.replace(/[A-Z]/g, c => ` ${c}`);
    },

    async makeActionModel() {
      const template = await templateWorker.readTemplate(this.path, templates.actionModel);
      return templateWorker.formatStringTemplate(template, [this.actionName, this.actionName]);
    },

    async makeActionType() {
      const template = await templateWorker.readTemplate(this.path, templates.actionType);
      return templateWorker.formatStringTemplate(template,
        [this.actionName, this.stateName, this.sentenceActionName]);
    },

  });
}

function makeTemplateWorker() {
  return ({

    readTemplate: async (path, template) => (await fs.readFile(`${path}/templates/${template}.template.ts`)).toString(),

    formatStringTemplate: (string, args) => {
      const format = (i, text) => {
        const template = `{${i}}`;
        if (text.includes(template) && args.length > i) {
          return format(i + 1, text.replace(template, args[i]));
        }
        return text;
      };

      return format(0, string);
    },
  });
}

module.exports = {
  makeActionGenerator,
};
