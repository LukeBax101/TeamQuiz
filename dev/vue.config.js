const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../dist"),
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    }
  }
}
