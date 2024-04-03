/**
 * @type {import("prettier").Options}
 *
 * Pas besoin d'import pour prettier concernant les plugins il peuvent être importer directement
 * Mais dois correspondre exactement au nom du package !
 *
 * prettier.config.js nouvelle syntaxe depuis la version 3.x
 */
export default {
  semi: false,
  singleQuote: true,
  endOfLine: 'lf',
  bracketSameLine: false,
  tabWidth: 2,
  printWidth: 120,
}
