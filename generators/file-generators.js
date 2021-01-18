const { makeTemplate } = require('../template');
const { upperSnake } = require('../name-ops');

const templates = {
  import: 'files/const',
};

function makeConstFileText(extensionPath, stateName) {
  const template = makeTemplate(extensionPath, templates.import);
  return template.fill([upperSnake(stateName), upperSnake(stateName)]);
}

module.exports = {
  makeConstFileText,
};
