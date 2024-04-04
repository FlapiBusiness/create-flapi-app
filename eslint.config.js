import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';
import eslintParserTypeScript from '@typescript-eslint/parser';

// Configuration principale
const mainConfig = {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    '@typescript-eslint': eslintPluginTypeScript,
    'eslint-plugin-prettier': eslintPluginPrettier,
  },
  rules: {
    // Active les règles de formatage de Prettier comme des règles ESLint.
    'eslint-plugin-prettier/prettier': 'error',

    // Exige que chaque fonction déclare explicitement son type de retour.
    '@typescript-eslint/explicit-function-return-type': ['error'],

    // Interdit l'assignation de valeurs de type 'any' à des variables, propriétés, etc., ce qui peut masquer des erreurs de type.
    '@typescript-eslint/no-unsafe-assignment': 'error',

    // Interdit l'appel de fonctions et l'accès à des méthodes de valeurs de type 'any', ce qui peut mener à des erreurs d'exécution.
    '@typescript-eslint/no-unsafe-call': 'error',

    // Interdit l'accès aux membres (propriétés ou méthodes) sur des valeurs de type 'any', car cela contourne les vérifications de type de TypeScript.
    '@typescript-eslint/no-unsafe-member-access': 'error',

    // Désactive l'inférence de type explicite pour les variables et les membres de classe.
    '@typescript-eslint/no-inferrable-types': 0,

    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: true, // Oblige à déclarer le type de paramètre pour les fonctions fléchées.
        variableDeclaration: true, // Oblige à déclarer le type de variable lors de l'initialisation.
        variableDeclarationIgnoreFunction: true, // Ignore les fonctions lors de la déclaration de type de variable.
      },
    ],

    // Interdit l'utilisation de variables non utilisées hors mi les variables commençant par '_'
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Cette règle impose des espaces autour des annotations de type pour une meilleure lisibilité.
    '@typescript-eslint/type-annotation-spacing': 'error',

    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi', // Utilise des points-virgules pour séparer les membres dans les déclarations multilignes.
          requireLast: true, // Exige un point-virgule après le dernier membre dans les déclarations multilignes.
        },
        singleline: {
          delimiter: 'semi', // Utilise des points-virgules pour séparer les membres dans les déclarations sur une seule ligne.
          requireLast: false, // N'exige PAS un point-virgule après le dernier membre dans les déclarations sur une seule ligne.
        },
      },
    ],
  },
  settings: {},
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: eslintParserTypeScript,
    parserOptions: {
      project: './tsconfig.json',
    },
    globals: {
      node: true,
    },
  },
  ...eslintConfigPrettier.overrides,
};

// Configuration pour l'ignorance globale
// Bug issue : https://github.com/eslint/eslint/issues/17400
const ignoreConfig = {
  ignores: ['dist/**', 'my-dev-project/**', 'my-app/**'],
};

/**
 * @type {import("eslint").Linter.Config}
 *
 * Exportation combinée des configurations
 * eslint.config.{js,mjs,cjs} nouvelle syntaxe depuis la version v9.x
 */
export default [mainConfig, ignoreConfig];
