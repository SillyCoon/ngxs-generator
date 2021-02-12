const { makeTemplate } = require('../template');
const { kebab } = require('../name-ops');

const templates = {
  import: 'import',
};

function makeImportGenerator(extensionPath, actionName, stateName) {
  return ({
    extensionPath,
    stateName,

    async makeImportStatement(type) {
      const template = makeTemplate(this.extensionPath, templates.import);
      return template.fill([actionName, `./${kebab(stateName)}.${type}`]);
    },

  });
}

module.exports = {
  makeImportGenerator,
};
