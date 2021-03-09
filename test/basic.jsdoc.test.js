/* global describe, test, expect */
// const path = require('path')
const plugin = require('../index.js')
// const utils = require('../src/utils.js')

const tags = {}
const mockDictionary = {
  defineTag (tag, actionObj) {
    tags[tag] = actionObj
  }
}

function testTag (tagVal, expectation) {
  const tag = { value: tagVal }
  const e = { doclet: { meta: { } } }
  plugin.defineTags(mockDictionary)
  tags.examples.onTagged(e.doclet, tag)
  testDoclet(e.doclet, expectation)
}

function testDoclet (doclet, expectation) {
  const e = { doclet: doclet }
  let outcome
  try {
    plugin.handlers.newDoclet(e)
    outcome = e.doclet.examples
  } catch (err) {
    outcome = err.code
  }
  // console.log(outcome)
  expect(outcome).toStrictEqual(expectation)
}

describe('tests of single examples file', () => {
  test('read examples file', () => {
    const tagVal = './example/test/data/examples/core-examples.js'
    const expectation = [
      '<caption>Core setup</caption>\ncore.reset()'
    ]
    testTag(tagVal, expectation)
  })
  test('example with multi-line comment', () => {
    const doclet = { name: 'addCore' }
    const expectation = [
      '/*\n' +
      ' * all lines of the function body proper (including comments like\n' +
      ' * this, and any lines of code) will show up in the documentation,\n' +
      " * except for lines ending in: '// skip'\n" +
      ' */\n' +
      'const result = core.addCore(2)\n' +
      '// <= 2',
      '// This is a simple example:\ncore.addCore(1)',
      'core.addCore(2)'
    ]
    testDoclet(doclet, expectation)
  })
  test('doclet with no example', () => {
    const doclet = { name: 'doesntExist' }
    const expectation = undefined
    testDoclet(doclet, expectation)
  })
})

describe('tests of examples directory', () => {
  test('read examples directory', () => {
    const tagVal = './example/test/data/examples/Foo'
    const expectation = undefined
    testTag(tagVal, expectation)
  })
  test('reading example file from examples dir', () => {
    const tagVal = 'Foo.js'
    const expectation = [
      '// this is how to instantiate\nlet foo = new Foo(2)'
    ]
    testTag(tagVal, expectation)
  })
  test('no double-reading', () => {
    const tagVal = 'Foo.js'
    const expectation = undefined
    testTag(tagVal, expectation)
  })
  test('reading another example file from examples dir, no examples tag', () => {
    const tagVal = 'bar.js'
    const expectation = [
      '// This is a simple example\n' +
      'let foo = new Foo(1)\n' +
      "let result = foo.bar('hi')\n" +
      '// <= "hi1"'
    ]
    testTag(tagVal, expectation)
  })
})
