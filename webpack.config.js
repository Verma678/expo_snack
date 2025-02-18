const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "app/components/"),  
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],  
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, "app/components/")],  
        use: "babel-loader",
      },
    ],
  },
};
