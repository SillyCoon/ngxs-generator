// function toPascalCase(str) {
// }

function lowerFirstChar(str) {
  return str.replace(/\w/, c => c.toLowerCase());
}

function sentence(str) {
  return str.replace(/[A-Z]/g, c => ` ${c}`).trim();
}

function kebab(str) {
  return str.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`).slice(1);
}

module.exports = {
  // toPascalCase,
  lowerFirstChar,
  sentence,
  kebab,
};
