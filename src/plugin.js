/**
 * @module plugin
 */

const fs = require('fs')
const path = require('path')
const utils = require('./utils.js')

/* this allows this module to be tested outside of the jsdoc context */
let logger
try {
  logger = require('jsdoc/util/logger')
} catch (e) {
  logger = { info: function () {} } // console.log
}

// The directory from which following examples will be taken
let _examplesDir = ''

// Holds contents of examples file (JSON) for each class or module
let _examples = {}

// used to avoid double file loads -- jsdoc seems to duplicate tags
let previousValue = null
let previousFilename = null

/**
 * Adds example text to '@examples'-tagged doclets.
 * If examples already exist, they are appended to.
 * @param {Object} doclet - the current JSDoc doclet
 */
function newDoclet ({ doclet }) {
  // console.log(JSON.stringify(doclet, null, 2))
  const name = doclet.name
  let examples = (Array.isArray(_examples)) ? _examples : _examples[name]
  examples = examples || _readExamples(name)
  if (!examples) return

  doclet.examples = doclet.examples || [] // ensure doclet has examples list
  // add each example to the doclet's list
  for (const example of examples) {
    const lines = utils.bodyString(example.code)
    if ('expect' in example) { // add the result at the end, if needed
      lines.push('// <= ' + JSON.stringify(example.expect))
    }
    if (lines[0].startsWith('// caption:')) {
      const str = lines[0].replace('// caption:', '').trim()
      lines[0] = '<caption>' + str + '</caption>'
    }
    doclet.examples.push(lines.join('\n'))
  }

  if (Array.isArray(_examples)) _examples = false
}

/**
 * Defines the '@examples' tag, and the action to be taken
 * when the tag is encountered
 * @param {*} dictionary
 */
function defineTags (dictionary) {
  dictionary.defineTag('examples', {
    mustHaveValue: true,
    onTagged: function (doclet, tag) {
      const filename = doclet.meta.filename
      if (filename !== previousFilename) _examplesDir = ''
      previousFilename = filename
      const value = tag.value
      if (value === previousValue) return // avoid double-processing
      previousValue = value
      if (fs.existsSync(value) && fs.lstatSync(value).isDirectory()) {
        logger.info('examples directory:', value)
        _examplesDir = value
        _examples = {} // null
      } else { // read example file
        _readExamples(doclet.name, value)
      }
    }
  })
}

function _readExamples (name, fn) {
  const expath = path.resolve(_examplesDir, fn || name + '.js')
  if (fs.existsSync(expath)) {
    logger.info('Reading @examples: ', expath)
    _examples = utils.examples(expath)
    if (_examples.examples) {
      if (_examples.setup) {
        _examples.examples[name] = [{ code: _examples.setup }]
      }
      _examples = _examples.examples
    }
  }
  return (Array.isArray(_examples)) ? _examples : _examples[name]
}

module.exports = {
  handlers: { newDoclet: newDoclet },
  defineTags: defineTags
}
