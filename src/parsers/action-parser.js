function appendActionTo(text, actionType, actionModel) {
  const textWithActionType = addActionType(text, actionType);
  return addActionModel(textWithActionType, actionModel);
}

function addActionType(txt, type) {
  return txt.replace(/enum ActionTypes\s*{/g, keep => `${keep} \n  ${type},`);
}

function addActionModel(txt, model) {
  return `${txt.trim()}\n\n${model}`;
}

module.exports = {
  appendActionTo,
};
