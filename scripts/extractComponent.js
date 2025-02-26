// const fs = require("fs");
// const path = require("path");

// const rootDir = path.join(__dirname, "../app");
// const componentsDir = path.join(rootDir, "widgets");
// const tabs = path.join(rootDir, "(tabs)");
// const dir2 = path.join(__dirname, "../assets");
// const images = path.join(dir2, "images");

// const outputFile = path.join(rootDir, "componentData.js");

// const allDirs = [componentsDir, tabs, rootDir, images];
// const components = {};

// function extractDependencies(content) {
//   const importRegex = /import\s+.*?from\s+['"](.*?)['"];/g;
//   const dependencies = [];
//   let match;
//   while ((match = importRegex.exec(content)) !== null) {
//     dependencies.push(match[1]);
//   }

//   return dependencies;
// }

// function resolveFilePath(importPath, currentDir) {
//   if (importPath.startsWith(".")) {
//     return path.resolve(currentDir, importPath + ".tsx");
//   } else {
//     for (const dir of allDirs) {
//       const possiblePath = path.join(dir, importPath + ".tsx");
//       if (fs.existsSync(possiblePath)) {
//         return possiblePath;
//       }
//     }
//   }
//   return null;
// }

// function processFile(filePath, currentDir) {
//   if (!fs.existsSync(filePath)) return;

//   const fileName = path.basename(filePath, path.extname(filePath));
//   if (components[fileName]) return;
//   const ext = path.extname(filePath).toLowerCase();
//   if (ext === ".tsx" || ext === ".jsx") {
//     const content = fs.readFileSync(filePath, "utf-8");
//     components[fileName] = content;
//     const dependencies = extractDependencies(content);
//     dependencies.forEach((importPath) => {
//       const resolvedPath = resolveFilePath(importPath, currentDir);
//       if (resolvedPath) {
//         processFile(resolvedPath, path.dirname(resolvedPath));
//       }
//     });
//   } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
//     const fileBuffer = fs.readFileSync(filePath);
//     const base64Data = fileBuffer.toString("base64");
//     components[fileName] = `data:image/${ext.replace(".", "")};base64,${base64Data}`;
//   }
// }

// allDirs.forEach((dir) => {
//   if (fs.existsSync(dir)) {
//     fs.readdirSync(dir).forEach((file) => {
//       const ext = path.extname(file).toLowerCase();
//       if ([".tsx", ".jsx", ".png", ".jpg", ".jpeg"].includes(ext)) {
//         processFile(path.join(dir, file), dir);
//       }
//     });
//   }
// });

// const outputContent = `export const componentData = {${Object.entries(components)
//   .map(([key, value]) => `\n  "${key}": \`${value.replace(/`/g, "\\`")}\`,`)
//   .join("")}
// };`;

// fs.writeFileSync(outputFile, outputContent, "utf-8");

// console.log("componentData.js generated successfully!");


// const fs = require("fs");
// const path = require("path");

// const tsconfigPath = path.join(__dirname, "../tsconfig.json");
// const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
// const aliasMap = tsconfig.compilerOptions.paths || {};

// const aliasPaths = Object.entries(aliasMap).reduce((acc, [alias, [target]]) => {
//   acc[alias.replace("/*", "")] = target.replace("/*", "");
//   return acc;
// }, {});

// const rootDir = path.join(__dirname, "../app");
// const componentsDir = path.join(rootDir, "widgets");
// const tabs = path.join(rootDir, "(tabs)");
// const assetsDir = path.join(__dirname, "../assets");
// const config = path.join(rootDir, "configurations");
// const imagesDir = path.join(assetsDir, "images");

// const outputFile = path.join(rootDir, "componentData.js");
// const allDirs = [tabs, rootDir, config];
// const components = {};
// const filesObject = {};


// function extractDependencies(content) {
//   const importRegex = /import\s+.*?from\s+['"](.*?)['"];/g;
//   const dependencies = [];
//   let match;
//   while ((match = importRegex.exec(content)) !== null) {
//     dependencies.push(match[1]); 
//   }
//   return dependencies;
// }

// function getAliasPath(filePath) {
//   const relativePath = path
//     .relative(path.join(__dirname, ".."), filePath)
//     .replace(/\\/g, "/");
//   const aliasPathWithoutExt = relativePath.replace(/\.[^/.]+$/, "");
//   for (const [alias, aliasDir] of Object.entries(aliasPaths)) {
//     if (relativePath.startsWith(aliasDir)) {
//       return `@/${aliasPathWithoutExt}`; 
//     }
//   }
//   return `@/${aliasPathWithoutExt}`; 
// }

// function processFile(filePath, currentDir) {
//   if (!fs.existsSync(filePath)) return;

//   const fileName = path.basename(filePath, path.extname(filePath));
//   if (components[fileName]) return;

//   const ext = path.extname(filePath).toLowerCase();
//   if (ext === ".tsx" || ext === ".jsx") {
//     const content = fs.readFileSync(filePath, "utf-8");
//     components[fileName] = content;
//     const aliasPath = getAliasPath(filePath);
//     filesObject[aliasPath] = { type: "CODE", contents: content };
//     const dependencies = extractDependencies(content);
//     dependencies.forEach((importPath) => {
//       if (importPath.startsWith(".")) {
//         const resolvedPath = path.resolve(currentDir, importPath + ".tsx");
//         if (fs.existsSync(resolvedPath)) processFile(resolvedPath, path.dirname(resolvedPath));
//       }
//     });
//   } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
//     const fileBuffer = fs.readFileSync(filePath);
//     const base64Data = fileBuffer.toString("base64");
//     components[fileName] = `data:image/${ext.replace(".", "")};base64,${base64Data}`;

//     const aliasPath = getAliasPath(filePath);
//     filesObject[aliasPath] = { type: "ASSET", contents: `data:image/${ext.replace(".", "")};base64,${base64Data}` };
//   }
// }

// allDirs.forEach((dir) => {
//   if (fs.existsSync(dir)) {
//     fs.readdirSync(dir).forEach((file) => {
//       const ext = path.extname(file).toLowerCase();
//       if ([".tsx", ".jsx", ".png", ".jpg", ".jpeg"].includes(ext)) {
//         processFile(path.join(dir, file), dir);
//       }
//     });
//   }
// });

// const outputContent = `export const componentData = {${Object.entries(components)
//   .map(([key, value]) => `\n  "${key}": \`${value.replace(/`/g, "\\`")}\`,`)
//   .join("")}
// };

// export const fileData = {
// ${Object.entries(filesObject)
//   .map(([key, value]) => 
//     `  "${key}": {\n    type: ${JSON.stringify(value.type)},\n    contents: \`${value.contents.replace(/`/g, "\\`")}\`\n  }`
//   )
//   .join(",\n")}
// };`;

// fs.writeFileSync(outputFile, outputContent, "utf-8");
// console.log("componentData.js and files object generated successfully!");


const fs = require("fs");
const path = require("path");

const tsconfigPath = path.join(__dirname, "../tsconfig.json");
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
const aliasMap = tsconfig.compilerOptions.paths || {};

const aliasPaths = Object.entries(aliasMap).reduce((acc, [alias, [target]]) => {
  acc[alias.replace("/*", "")] = target.replace("/*", "");
  return acc;
}, {});

const rootDir = path.join(__dirname, "../app");
const componentsDir = path.join(rootDir, "widgets");
const tabs = path.join(rootDir, "(tabs)");
const assetsDir = path.join(__dirname, "../assets");
const config = path.join(rootDir, "configurations");
const imagesDir = path.join(assetsDir, "images");

const outputFile = path.join(rootDir, "componentData.js");
const allDirs = [tabs, rootDir, config];
const components = {};
const filesObject = {};


function extractDependencies(content) {
  const importRegex = /import\s+.*?from\s+['"](.*?)['"];/g;
  const dependencies = [];
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    dependencies.push(match[1]); 
  }
  return dependencies;
}

function getAliasPath(filePath) {
  const relativePath = path
    .relative(path.join(__dirname, ".."), filePath)
    .replace(/\\/g, "/");
  const aliasPathWithoutExt = relativePath.replace(/\.[^/.]+$/, "");
  
  for (const [alias, aliasDir] of Object.entries(aliasPaths)) {
    if (relativePath.startsWith(aliasDir)) {
      return `@/${aliasPathWithoutExt}`; 
    }
  }
  return `@/${aliasPathWithoutExt}`; 
}


function resolveFilePath(importPath, currentDir) {
  let resolvedPath = null;

  if (importPath.startsWith(".")) {
    resolvedPath = path.resolve(currentDir, importPath + ".tsx");
  } else {
    for (const [alias, aliasDir] of Object.entries(aliasPaths)) {
      if (importPath.startsWith(alias)) {
        const subPath = importPath.replace(alias, "").replace(/^\//, "");
        resolvedPath = path.join(path.join(__dirname, "..", aliasPaths[alias]), subPath + ".tsx");
        break;
      }
    }
    if (!resolvedPath) {
      for (const dir of allDirs) {
        const possiblePath = path.join(dir, importPath + ".tsx");
        if (fs.existsSync(possiblePath)) {
          resolvedPath = possiblePath;
          break;
        }
      }
    }
  }

  return fs.existsSync(resolvedPath) ? resolvedPath : null;
}

function processFile(filePath, currentDir) {
  if (!fs.existsSync(filePath)) return;

  const fileName = path.basename(filePath, path.extname(filePath));
  if (components[fileName]) return; 

  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".tsx" || ext === ".jsx") {
    const content = fs.readFileSync(filePath, "utf-8");
    components[fileName] = content;
    
    const aliasPath = getAliasPath(filePath);
    filesObject[aliasPath] = { type: "CODE", contents: content };
    const dependencies = extractDependencies(content);
    dependencies.forEach((importPath) => {
      const resolvedPath = resolveFilePath(importPath, currentDir);
      if (resolvedPath) processFile(resolvedPath, path.dirname(resolvedPath));
    });
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
  .map(([key, value]) => `\n  "${key}": \`${value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${")}\`,`).join("")}
};



export const fileData = {
${Object.entries(filesObject)
  .map(([key, value]) => 
    `  "${key}": {\n    type: ${JSON.stringify(value.type)},\n    contents: \`${value.contents.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${")}\`\n  }`
  )
  .join(",\n")}
}`;


fs.writeFileSync(outputFile, outputContent, "utf-8");
console.log("componentData.js and fileData object generated successfully!");






