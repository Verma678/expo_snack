const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "../app/components");
const outputFile = path.join(__dirname, "../app/componentData.js");

const components = {};

fs.readdirSync(componentsDir).forEach((file) => {
  if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
    const filePath = path.join(componentsDir, file);
    const fileName = path.basename(file, path.extname(file));
    const content = fs.readFileSync(filePath, "utf-8");
    components[fileName] = content;
  }
});

const outputContent = `export const componentData = {${Object.entries(
  components
)
  .map(([key, value]) => `\n  "${key}": \`\n${value}\`,`)
  .join("")}
  };`;

fs.writeFileSync(outputFile, outputContent, "utf-8");
