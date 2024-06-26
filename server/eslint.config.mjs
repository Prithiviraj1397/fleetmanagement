import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    "ignores": ["node_modules/", "build/"]
  },
  {
    rules:{
      "eol-last"            : ["error", "always"],
      "block-scoped-var"    : "error",
      "curly"               :  ["error", "all"],
      "eqeqeq"              : ["error", "always"],
      "no-var"              : "error",
      "prefer-destructuring": ["error", { "object": true, "array": false }, {
        "enforceForRenamedProperties": true
      }],
      "camelcase"           : ["warn", { "properties": "always" }],
      "object-shorthand"    : ["error", "always"],
      "comma-spacing"       : ["error", { "before": false, "after": true }],
      "array-bracket-spacing": ["error", "never"],
      "no-console"           : ["error", { allow: ["warn", "error"] }],
      "init-declarations"    : ["error", "always"],
      "object-curly-spacing" : ["error", "always", { "arraysInObjects": true }],
      "no-duplicate-imports" : ["error", { "includeExports": true }],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"] }
      ],
      "no-irregular-whitespace": ["error", { "skipComments": true }],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/ban-types": "error"
    }
  }
];
