const { makeFile } = require('./file');

function makeTemplate(path, templateName) {
  const templateFile = makeFile(`${path}/templates/${templateName}.template.ts`);

  return ({
    fill: async (args) => {
      const format = (i, text) => {
        const template = `{${i}}`;
        if (text.includes(template) && args.length > i) {
          return format(i + 1, text.replace(template, args[i]));
        }
        return text;
      };

      const templateText = await templateFile.getText();

      return format(0, templateText);
    },
  });
}

module.exports = {
  makeTemplate,
};
