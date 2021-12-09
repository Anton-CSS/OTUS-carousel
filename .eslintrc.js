module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parser: "@babel/eslint-parser",
  extends: ["airbnb-base", "prettier", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-plusplus": 0,
    "no-alert": "off",
    "no-console": "off",
    "consistent-return": "off",
    "no-param-reassign": "off",
    "import/prefer-default-export": "off",
  },
  plugins: ["jest"],
};
