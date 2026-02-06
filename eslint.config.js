import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJsxAlly from "eslint-plugin-jsx-a11y";
import globals from "globals";
import configPrettier from "eslint-config-prettier";
import pluginReactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // 1. Ignore Configuration
  // The first object defines files/folders to ignore.
  { ignores: ["node_modules/", "dist/", ".vite/", "build/"] },

  // 2. Main JavaScript/JSX Configuration
  {
    // Target JavaScript and JSX files
    files: ["**/*.{js,mjs,cjs,jsx}"],

    languageOptions: {
      // Set the JavaScript version to latest
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
      globals: {
        // Include browser-specific global variables (like window, document)
        ...globals.browser,
      },
    },

    // Map imported plugins to short keys for use in rules/configs
    plugins: {
      js: pluginJs,
      react: pluginReact,
      "react-hooks": {
        rules: pluginReactHooks.rules,
      },
      "react-refresh": reactRefresh,
      "jsx-a11y": pluginJsxAlly,
    },

    // Settings object for plugins to know about the environment
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
      // Note: The 'jsx' setting is typically managed by the plugins themselves
      // and might not be needed explicitly here in modern configs.

      // This is generally for 'eslint-plugin-import', which you haven't installed,
      // but keeping it here for future use if you decide to add it.
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".mjs"],
        },
      },
    },

    // Define Rules
    rules: {
      // Apply recommended base rules from included plugins
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxAlly.configs.recommended.rules,

      // Custom Rule Overrides:

      // Turn off rules related to the old JSX transform (since React 17+ uses the new transform)
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Disable the Prop Types rule (common in modern React with TypeScript/Flow)
      "react/prop-types": "off",

      // Warning for unused variables, but allow declaration
      "no-unused-vars": "warn",
      "no-undef": "error", // Error on usage of undeclared variables

      // Warn for console logs, but allow console.warn and console.error
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Add the essential rule for React Refresh/Fast Refresh (for development)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      ...configPrettier.rules,
    },
  },
];

// Ctrl+Shift+P -> ESLint: Restart ESLint Server
