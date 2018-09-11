String.prototype.trimWhiteSpaces = trimWhiteSpaces;
String.prototype.replaceAccents = replaceAccents;

interface String {
  trimWhiteSpaces: typeof trimWhiteSpaces;
  replaceAccents: typeof replaceAccents;
}

function trimWhiteSpaces() {
  return this.split(' ').join('');
}

function replaceAccents() {
  return this.replace(/[á]/g, 'a')
    .replace(/[é]/g, 'e')
    .replace(/[í]/g, 'i')
    .replace(/[ó]/g, 'o')
    .replace(/[ú]/g, 'u');
}