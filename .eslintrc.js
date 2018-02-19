module.exports = {
    // Среды - среды, в которых ваши .js файлы будут запущены. Каждая среда предоставляет определенный набор предопределенных глобальных переменных.
  'env': {
      'node': true,
      'es6': true
   },
 "parser": "babel-eslint",
      'parserOptions': {
         "sourceType": "module",
         "ecmaVersion": 6,
         'ecmaFeatures': {
           'jsx': true       }
   },

    "plugins": [
        "react"
  ],
    // Здесь таятся наши правила.
    'rules': {
        'indent': [2, 4], // оповещать как ошибку
        'brace-style': [2, '1tbs'], // оповещать как ошибку
        'no-unused-vars': [1], // оповещать как предупреждение
        'no-console': [0],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
};
