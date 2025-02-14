// const fs = require("fs");
// const path = require("path");

// const componentsDir = path.join(__dirname, "../app/(tabs)");
// const outputFile = path.join(__dirname, "../app/componentData.js");

// const components = {};

// fs.readdirSync(componentsDir).forEach((file) => {
//   if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
//     const filePath = path.join(componentsDir, file);
//     const content = fs.readFileSync(filePath, "utf-8");
//     components[file] = content;
//   }
// });

// const outputContent = `export const componentData = ${JSON.stringify(
//   components,
//   null,
//   2
// )};`;

// fs.writeFileSync(outputFile, outputContent, "utf-8");
