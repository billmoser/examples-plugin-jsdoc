/* global describe, expect, it */

/**
 * @module testing
 */

const fs = require('fs')
const path = require('path')
const utils = require('./utils.js')

function testArray (examples, setup, key) {
  const msgBase = (key) ? '[' + key + ']: ' : ''
  for (const i in examples) {
    const msg = msgBase + 'example ' + i
    it(msg, () => {
      if (setup) setup()
      const result = examples[i].code()
      const expected = examples[i].expect
      expect(result).toEqual(expected)
    })
  }
}

/**
 * Test all examples
 * @param {Object[]} info
 */
function testAll (info) {
  for (const elt of info) {
    const { examples, module } = elt
    let root = ''
    let files = [examples]
    if (fs.lstatSync(examples).isDirectory()) {
      root = examples
      files = fs.readdirSync(root)
    }
    for (const file of files) {
      const absPath = path.resolve(root, file)
      const exobj = utils.examples(absPath, module)
      describe('testing ' + file, () => {
        if (Array.isArray(exobj)) {
          testArray(exobj, null, null)
        } else if (Array.isArray(exobj.examples)) {
          testArray(exobj.examples, exobj.setup, null)
        } else {
          for (const key in exobj.examples) {
            testArray(exobj.examples[key], exobj.setup, key)
          }
        }
      })
    }
  }
}

module.exports = { testAll: testAll }
