const plugin = require('./src/plugin.js')
const testing = require('./src/testing.js')
module.exports = {
  testAll: testing.testAll,
  defineTags: plugin.defineTags,
  handlers: plugin.handlers
}
