module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        indent: ['error', 4],
        semi: false, // aqui retira o ponto e vírgula do final da linha
        singleQuote: true, // define aspas simples
        trailingComma: false // aqui eu tiro a virgula da última propriedade de qualquer objeto
    }
}
