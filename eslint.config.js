import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import eslintPluginStylistic from '@stylistic/eslint-plugin'
import eslintPluginJSDoc from 'eslint-plugin-jsdoc'
import eslintParserTypeScript from '@typescript-eslint/parser'

// Configuration principale
const mainConfig = {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    '@typescript-eslint': eslintPluginTypeScript,
    'eslint-plugin-prettier': eslintPluginPrettier,
    'eslint-plugin-unused-imports': eslintPluginUnusedImports,
    'eslint-plugin-jsdoc': eslintPluginJSDoc,
    '@stylistic-eslint-plugin': eslintPluginStylistic,
  },
  rules: {
    // Active les règles de formatage de Prettier comme des règles ESLint.
    'eslint-plugin-prettier/prettier': 'error',

    // Prévient les imports inutilisés, aidant à garder le code propre
    // et à réduire la taille du bundle en éliminant les dépendances inutiles.
    'eslint-plugin-unused-imports/no-unused-imports': 'error',

    '@typescript-eslint/naming-convention': [
      'error',
      {
        // Variables, fonctions, paramètres de fonction, méthodes, propriétés, arguments de méthode, etc.
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow', // Par exemple, _privateVariable pourrait être utilisé pour marquer une variable d'instance privée dans une classe.
        trailingUnderscore: 'allow', //  L'utilisation d'underscores à la fin est moins courante, mais elle peut servir dans certains cas spécifiques où un identifiant pourrait autrement entrer en conflit avec un mot-clé du langage ou une limitation similaire.
      },
      {
        // Classes, interfaces, types, enums et autres éléments de type-like
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    // Avec des options pour forcer l'explicité des constructeurs:
    // Cela peut aider à garantir que les constructeurs de classe sont explicitement marqués comme public, private, ou protected
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
    ],

    // Encourage l'utilisation d'initialiseurs avec les énumérations pour garantir que chaque membre de l'énumération
    // a une valeur explicite, améliorant ainsi la clarté et la prévisibilité du code.
    '@typescript-eslint/prefer-enum-initializers': 'error',

    // Dans un projet TypeScript, il est préférable d'utiliser des importations de modules ES6 plutôt
    // que l'ancienne syntaxe require() de CommonJS, pour une meilleure cohérence et interopérabilité des modules.
    '@typescript-eslint/no-var-requires': 'error',

    // Encourage l'utilisation de la syntaxe import type {...} pour les importations de types uniquement.
    // Réduit le coût de l'importation de types en TypeScript, car les importations de types ne sont pas incluses dans le code généré.
    '@typescript-eslint/consistent-type-imports': 'error',

    // Les types explicites pour les valeurs de retour et les arguments de la
    // fonction indiquent clairement à tout code appelant quelle est la limite d'entrée et de sortie du module
    '@typescript-eslint/explicit-module-boundary-types': 'error',

    // Cette règle vous aide à identifier les fonctions async qui n'utilisent pas await. Cela peut être utile pour éviter des erreurs
    // où une fonction est marquée comme async sans raison, ce qui peut conduire à des comportements inattendus ou à une consommation inutile de ressources.
    '@typescript-eslint/require-await': 'error',

    // Avertit contre l'utilisation incorrecte des promesses, par exemple, dans les callbacks
    // sans await ou quand une fonction attend une promesse mais reçoit un type non-promise.
    '@typescript-eslint/no-misused-promises': 'error',

    // Interdit les conditions qui sont toujours vraies ou toujours fausses en fonction des types des expressions impliquées.
    // Cela peut aider à prévenir les erreurs logiques basées sur une mauvaise compréhension des types possibles dans une expression.
    '@typescript-eslint/no-unnecessary-condition': 'error',

    // Encourage l'utilisation de la chaîne optionnelle (?.) pour accéder aux propriétés ou
    // appeler des méthodes sur des objets qui peuvent être null ou undefined, réduisant ainsi le besoin de vérifications explicites de nullité.
    '@typescript-eslint/prefer-optional-chain': 'error',

    // Exige ou interdit un espace avant la parenthèse ouvrante des déclarations de fonctions.
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    // Encourage l'utilisation de readonly pour marquer les membres de classe qui ne devraient pas être modifiés après l'initialisation.
    '@typescript-eslint/prefer-readonly': 'error',

    // Interdit l'utilisation de "nombres magiques" dans le code, encourageant l'utilisation de constantes nommées pour une meilleure lisibilité.
    '@typescript-eslint/no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],

    // Exige que les membres de la classe (propriétés et méthodes) spécifient explicitement leur visibilité (public, private, protected).
    '@typescript-eslint/explicit-member-accessibility': 'error',

    // Exige que chaque fonction déclare explicitement son type de retour.
    '@typescript-eslint/explicit-function-return-type': ['error'],

    // Interdit l'utilisation de valeurs de type 'any', car cela peut masquer des erreurs de type.
    '@typescript-eslint/no-explicit-any': 'error',

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
      },
    ],

    // Interdit l'utilisation de variables non utilisées hors mi les variables commençant par '_'
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Prévient l'utilisation de variables avant leur déclaration,
    // ce qui peut aider à éviter les erreurs difficiles à tracer causées par le hoisting.
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],

    // Cette règle impose des espaces autour des annotations de type pour une meilleure lisibilité.
    '@stylistic-eslint-plugin/type-annotation-spacing': 'error',

    '@stylistic-eslint-plugin/member-delimiter-style': [
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

    // Vérifie que les balises @access sont utilisées correctement pour indiquer l'accessibilité des membres (public, private, etc.).
    'eslint-plugin-jsdoc/check-access': 'error',

    // Assure que les astérisques dans les blocs de commentaires JSDoc sont alignés verticalement.
    'eslint-plugin-jsdoc/check-alignment': 'error',

    // Contrôle l'alignement des lignes à l'intérieur des blocs de commentaires JSDoc.
    'eslint-plugin-jsdoc/check-line-alignment': 'error',

    // S'assure que les noms des paramètres dans les commentaires JSDoc correspondent à
    // ceux dans la déclaration de fonction, vérifie l'absence de doublons et la présence de tous les paramètres.
    'eslint-plugin-jsdoc/check-param-names': 'error',

    //Vérifie l'absence de doublons dans les noms de propriétés JSDoc
    // et que les propriétés imbriquées ont des noms de racine corrects.
    'eslint-plugin-jsdoc/check-property-names': 'error',

    // Vérifie l'utilisation correcte des noms de balises JSDoc, y compris l'orthographe et l'existence de balises personnalisées.
    'eslint-plugin-jsdoc/check-tag-names': 'error',

    // Vérifie la validité des types spécifiés dans les balises JSDoc, offrant la possibilité de personnaliser les types acceptables.
    'eslint-plugin-jsdoc/check-types': 'error',

    // Vérifie que les commentaires JSDoc contiennent des descriptions pour tous les éléments documentés.
    'eslint-plugin-jsdoc/require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],

    // Exige que tous les paramètres de fonction soient documentés avec une balise @param.
    'eslint-plugin-jsdoc/require-param': 'error',

    // Exige une description pour chaque balise @param documentée, améliorant ainsi la compréhension du but de chaque paramètre.
    'eslint-plugin-jsdoc/require-param-description': 'error',

    // Exige que chaque balise @param ait un nom de paramètre spécifié, assurant que la documentation est complète et précise.
    'eslint-plugin-jsdoc/require-param-name': 'error',

    // Exige que les instructions de retour dans les fonctions soient documentées avec une balise @returns.
    'eslint-plugin-jsdoc/require-returns': 'error',

    // Exige une instruction de retour dans le corps de la fonction si une balise @returns est spécifiée, garantissant que la documentation correspond au comportement de la fonction.
    'eslint-plugin-jsdoc/require-returns-check': 'error',

    // Exige une description pour la balise @returns, fournissant des détails sur ce que la fonction retourne.
    'eslint-plugin-jsdoc/require-returns-description': 'error',

    // Exige que tous les types utilisés dans les balises JSDoc soient valides, améliorant ainsi la précision et la fiabilité de la documentation.
    'eslint-plugin-jsdoc/valid-types': 'error',
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
export default [mainConfig, ignoreConfig, eslintConfigPrettier]
