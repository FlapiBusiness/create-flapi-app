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

    '@typescript-eslint/naming-convention': ['error', 
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
        format: ['PascalCase']
      }   
    ],
    
    // Avec des options pour forcer l'explicité des constructeurs: 
    // Cela peut aider à garantir que les constructeurs de classe sont explicitement marqués comme public, private, ou protected
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit', overrides: { constructors: 'no-public' } }],

    // Encourage l'utilisation d'initialiseurs avec les énumérations pour garantir que chaque membre de l'énumération
    // a une valeur explicite, améliorant ainsi la clarté et la prévisibilité du code.
    '@typescript-eslint/prefer-enum-initializers': 'error',

    // Dans un projet TypeScript, il est préférable d'utiliser des importations de modules ES6 plutôt 
    // que l'ancienne syntaxe require() de CommonJS, pour une meilleure cohérence et interopérabilité des modules.
    '@typescript-eslint/no-var-requires': 'error',

    // Encourage l'utilisation de la syntaxe import type {...} pour les importations de types uniquement. 
    // Réduit le coût de l'importation de types en TypeScript, car les importations de types ne sont pas incluses dans le code généré.
    '@typescript-eslint/consistent-type-imports': 'error',

    // Encourage l'utilisation de types readonly dans les paramètres de fonction pour éviter les mutations involontaires.
    '@typescript-eslint/prefer-readonly-parameter-types': 'error',

    // Les types explicites pour les valeurs de retour et les arguments de la 
    // fonction indiquent clairement à tout code appelant quelle est la limite d'entrée et de sortie du module
    '@typescript-eslint/explicit-module-boundary-types': 'error',

    //Cette règle vous aide à identifier les fonctions async qui n'utilisent pas await. Cela peut être utile pour éviter des erreurs 
    // où une fonction est marquée comme async sans raison, ce qui peut conduire à des comportements inattendus ou à une consommation inutile de ressources.
    '@typescript-eslint/require-await': 'error',

    // Exige que les promesses soient gérées correctement, en s'assurant qu'elles sont soit attendues avec await, soit explicitement ignorées 
    // avec void ou un gestionnaire d'erreur. Cela prévient les problèmes où des opérations asynchrones pourraient être démarrées sans que leur achèvement soit suivi.
    '@typescript-eslint/no-floating-promises': 'error',

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
    '@typescript-eslint/space-before-function-paren': ['error', {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    
    // Encourage l'utilisation de readonly pour marquer les membres de classe qui ne devraient pas être modifiés après l'initialisation.
    '@typescript-eslint/prefer-readonly': 'error',

    // Interdit l'utilisation de "nombres magiques" dans le code, encourageant l'utilisation de constantes nommées pour une meilleure lisibilité.
    '@typescript-eslint/no-magic-numbers': ['error', { 'ignore': [-1, 0, 1] }],

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
