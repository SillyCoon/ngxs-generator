module.exports = {
  helpers: {
    makeActionTypeString: (enumKey, stateId, name) => `${enumKey} = "[${stateId}] ${name}"`,

    // eslint-disable-next-line arrow-body-style
    makeActionModel: (name, typeKey) => {
      return `export class ${name} {\n` +
             `  public static readonly type = ActionTypes.${typeKey};\n\n` +
             '  constructor(public readonly payload: any) {}\n' +
             '}';
    },

    makeActionNameInNeededNotations: (actionName) => {
      function toUpperSnakeCase(str) {
        return str.replace(/[A-Z]/g, c => `_${c}`).slice(1).toUpperCase();
      }

      function toSentence(str) {
        return str.replace(/[A-Z]/g, c => ` ${c}`);
      }

      return [actionName, toUpperSnakeCase(actionName), toSentence(actionName)];
    },
  },
};
