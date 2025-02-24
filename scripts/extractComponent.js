const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "../app");
const componentsDir = path.join(rootDir, "widgets");
const tabs = path.join(rootDir, "(tabs)");
const dir2 = path.join(__dirname, "../assets");
const images = path.join(dir2, "images");

const outputFile = path.join(rootDir, "componentData.js");

const allDirs = [componentsDir, tabs, rootDir, images];
const components = {};

function extractDependencies(content) {
  const importRegex = /import\s+.*?from\s+['"](.*?)['"];/g;
  const dependencies = [];
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    dependencies.push(match[1]);
  }

  return dependencies;
}

function resolveFilePath(importPath, currentDir) {
  if (importPath.startsWith(".")) {
    return path.resolve(currentDir, importPath + ".tsx");
  } else {
    for (const dir of allDirs) {
      const possiblePath = path.join(dir, importPath + ".tsx");
      if (fs.existsSync(possiblePath)) {
        return possiblePath;
      }
    }
  }
  return null;
}

function processFile(filePath, currentDir) {
  if (!fs.existsSync(filePath)) return;

  const fileName = path.basename(filePath, path.extname(filePath));
  if (components[fileName]) return;
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".tsx" || ext === ".jsx") {
    const content = fs.readFileSync(filePath, "utf-8");
    components[fileName] = content;
    const dependencies = extractDependencies(content);
    dependencies.forEach((importPath) => {
      const resolvedPath = resolveFilePath(importPath, currentDir);
      if (resolvedPath) {
        processFile(resolvedPath, path.dirname(resolvedPath));
      }
    });
  } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString("base64");
    components[fileName] = `data:image/${ext.replace(".", "")};base64,${base64Data}`;
  }
}

allDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const ext = path.extname(file).toLowerCase();
      if ([".tsx", ".jsx", ".png", ".jpg", ".jpeg"].includes(ext)) {
        processFile(path.join(dir, file), dir);
      }
    });
  }
});

const outputContent = `export const componentData = {${Object.entries(components)
  .map(([key, value]) => `\n  "${key}": \`${value.replace(/`/g, "\\`")}\`,`)
  .join("")}
};`;

fs.writeFileSync(outputFile, outputContent, "utf-8");

console.log("componentData.js generated successfully!");
