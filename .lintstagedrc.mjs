import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

export default {
  "**/*.ts?(x)": [
    "prettier --write",
    () => "tsc -p tsconfig.json --noEmit",
    buildEslintCommand,
  ],
  "**/*.{js,jsx}": ["prettier --write", buildEslintCommand],
};
