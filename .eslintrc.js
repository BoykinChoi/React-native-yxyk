
/**
 * 参考文档
 * https://eslint.org/
 * https://www.npmjs.com/package/eslint-config-airbnb
 * 
 * 注意: 
 * 1.这个文件只由一人维护, 其他人尽量不要改动
 * 2.请大家务必遵守规则, 提交的文件不允许出现红色波浪线
 */
module.exports = {
  "parser": "babel-eslint",
  // "extends": "airbnb",
  "globals": {
      "FormData": true,
  },
  "rules": {
      "indent": ["error", 2],
      "no-use-before-define": 0, 
      "react/prefer-stateless-function": 0,
      "react/jsx-filename-extension": 0,
      "import/prefer-default-export": 0,
      "import/no-unresolved": 0,
      "no-shadow": 0,
      "react/sort-comp": 0,
      "no-else-return": 0, 
      "react/prop-types": 0,
      "no-unused-vars": 0,
      "camelcase": 0,
      "no-console": 0,
      "react/require-default-props": 0,
      "no-return-assign": 0,
      "react/no-array-index-key": 0,
      "max-len": 0,
      "react/no-multi-comp": 0,
      "react/forbid-prop-types": 0,
      "import/extensions": 0,
      "guard-for-in": 0,
      "no-restricted-syntax": 0,
      "dot-notation": 0,
      "class-methods-use-this": 0,
      "padded-blocks": 0,
      "one-var": 0,
      "no-trailing-spaces": 0, 
      "arrow-body-style": 0,
      "no-mixed-operators": 0,
      "brace-style": 0,
      "no-multi-spaces": 0,
      "no-plusplus": 0,
      "no-dupe-keys": 0,
      "radix": 0,
      "comma-dangle": 0,
      "func-names": 0,
      "semi": 0,
  },
}