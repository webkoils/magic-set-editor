module.exports = {
    files: ["*.spec.*", "*.test.*"],
    extends: [
        "standard",
        "standard-jsx",
        "plugin:jest/recommended",
        "prettier"
    ],
    plugins: ["@typescript-eslint", "jest"],
    parser: "@typescript-eslint/parser",
    env: {
        jest: true
    },
    rules: {
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-explicit-any": 0
    }
};
