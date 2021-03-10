// the test function -- require('examples-plugin-jsdoc') in your app
const testAll = require('../../index.js').testAll

// don't forget to require the modules you want to test examples for
const core = require('../src/core.js')
const Foo = require('../src/Foo.js')

// only needed for mocha
global.expect = global.expect || require('expect')

testAll([
  // test info for the core module
  {
    examples: './test/data/examples/core-examples.js',
    module: core
  },
  // test info for the Foo module
  {
    examples: './test/data/examples/Foo',
    module: Foo
  }
])
