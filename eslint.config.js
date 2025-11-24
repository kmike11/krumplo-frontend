import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    ignores: ["dist", "node_modules", "src/api/**/*"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tseslint,
      import: importPlugin,
      "jsx-a11y": jsxA11y
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...tseslint.configs["recommended-type-checked"].rules,
      "import/no-unresolved": "off",
      "import/order": [
        "warn",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always"
        }
      ]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
