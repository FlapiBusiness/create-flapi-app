import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin'
import eslintParserTypeScript from '@typescript-eslint/parser'

// Configuration principale
const mainConfig = {
  files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
  plugins: {
    eslintConfigPrettier,
    eslintPluginPrettier,
    eslintPluginTypeScript,
  },
  rules: {},
  settings: {},
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: eslintParserTypeScript,
    globals: {
      node: true,
      project: true,
    },
  },
}

// Configuration pour l'ignorance globale
// Bug issue : https://github.com/eslint/eslint/issues/17400
const ignoreConfig = {
  ignores: ['dist/**', 'my-dev-project/**', 'my-app/**'],
}

/**
 * @type {import("eslint").Linter.Config}
 *
 * Exportation combinée des configurations
 * eslint.config.{js,mjs,cjs} nouvelle syntaxe depuis la version v9.x
 */
export default [mainConfig, ignoreConfig]
