// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  plugins: ["eslint-plugin-react-compiler"],
  ignorePatterns: ["/dist/*","/components/ui/*","/node_modules/*"],
  rules: {
    "react-compiler/react-compiler": "error"
  }
};
