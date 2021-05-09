const labels = require("../labels");
const toMarkdown = (label) => {
    return `- ![#${label.color}](https://via.placeholder.com/15/${label.color}/000000?text=+) ${label.name} ${label.description ? "- " + label.description : ""}`;
};

const markdown = labels.map(toMarkdown).join("\n");
console.log(markdown);
