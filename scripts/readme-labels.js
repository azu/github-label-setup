import { createRequire } from "module";
const require = createRequire(import.meta.url);
const labels = require("../labels.json");
const toMarkdown = (label) => {
    return `- ![#${label.color}](https://placehold.co/15x15/${label.color}/${label.color}.png) ${label.name} ${label.description ? "- " + label.description : ""}`;
};

const markdown = labels.map(toMarkdown).join("\n");
console.log(markdown);
