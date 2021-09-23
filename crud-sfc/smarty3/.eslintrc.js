// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-unused-vars': 'off',
    "space-before-blocks": "off",
    "quotes": "off",
    "no-extra-semi": "off",
    "semi": "off",
    "indent": "off",
    "space-before-function-paren": "off",
    "one-var": "off",
    "no-multiple-empty-lines": "off",
    "wrap-iife": "off",
    "no-unreachable": "off",
    "padded-blocks": "off",
    "new-cap": "off",
    "no-func-assign": "off",
    "curly": "off",
    "spaced-comment": "off",
    "no-undef-init": "off",
    "no-unsafe-finally": "off",
    "space-unary-ops": "off",
    "block-spacing": "off",
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
