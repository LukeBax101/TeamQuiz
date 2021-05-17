const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/team-quiz' : '/',
  outputDir: path.resolve(__dirname, "../dist"),
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    }
  }
}
