/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["../../.eslintrc.js"],
  overrides: [
    {
      files: ["./src/generateTypes.ts"],
      rules: {
        "import/prefer-default-export": "off"
      }
    }
  ]
}
