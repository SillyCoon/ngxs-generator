// function toPascalCase(str) {
// }

function lowerFirstChar(str) {
  return str.replace(/\w/, c => c.toLowerCase());
}

function sentence(str) {
  return str.replace(/[A-Z]/g, c => ` ${c}`);
}

module.exports = {
  // toPascalCase,
  lowerFirstChar,
  sentence,
};
