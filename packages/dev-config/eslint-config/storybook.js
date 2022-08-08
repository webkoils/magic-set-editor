module.exports = {
    files: ["*.story.tsx", "*.story.mdx", "*.story.jsx"],

    extends: ["standard", "plugin:storybook/recommended", "prettier"],
    plugins: ["@typescript-eslint", "storybook", "prettier"],
    parser: "@typescript-eslint/parser",
    rules: {
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "import/no-anonymous-default-export": 0
    }
};
