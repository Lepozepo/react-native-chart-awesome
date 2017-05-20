module.exports = {
  "extends": "airbnb",
  "plugins": ["react"],
  "parser": "babel-eslint",
  "rules": {
    "arrow-body-style": 0,
    "react/jsx-no-bind": 0,
    "no-underscore-dangle": 0,
    "import/no-unresolved": [2, { ignore: ['react-native-linear-gradient', '\.png$'] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "settings": {
    "import/resolver": "meteor"
  }
};
