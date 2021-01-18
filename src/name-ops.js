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

function upperSnake(str) {
  return str.replace(/[A-Z]/g, c => `_${c}`).slice(1).toUpperCase();
}

module.exports = {
  // toPascalCase,
  lowerFirstChar,
  sentence,
  kebab,
  upperSnake,
};
