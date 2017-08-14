module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  // required to lint *.vue files
  "plugins": [
    "html"
  ],
  // check if imports actually resolve
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack.base.conf.js"
      }
    }
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": 0,
    "linebreak-style": [0, "unix"],
    "no-console": 0,
    'no-undef': 0
  }
}
