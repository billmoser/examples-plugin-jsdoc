const testAll = require('../../index.js').testAll
const core = require('../src/core.js')
const Foo = require('../src/Foo.js')

// only needed for mocha
global.expect = global.expect || require('expect')

testAll([
  {
    examples: './test/data/examples/core-examples.js',
    module: core
  }, {
    examples: './test/data/examples/Foo',
    module: Foo
  }])
