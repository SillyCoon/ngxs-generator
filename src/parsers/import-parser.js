const { kebab } = require('../name-ops');

function appendImport(text, importStatement, stateName, actionName) {
  const importRegexp = /import.+from.+;/;
  const alreadyHasImportRegexp = new RegExp(`\\s\*\\\}\(\?\=\\s\*from\\s\+\(\'\|"\).\\\/${kebab(stateName)}.actions\)`);

  if (alreadyHasImportRegexp.test(text)) {
    return text.replace(alreadyHasImportRegexp, replaced => `, ${actionName} ${replaced.trim()}`);
  }

  return text.replace(importRegexp, (replaced) => `${importStatement}\n${replaced}`);
}

module.exports = {
  appendImport,
};
