/**
 * @module utils
 */

const fs = require('fs')
const NodeVM = require('vm2').NodeVM

/**
 * What is *f*'s body, as a list of source lines?
 * @static
 * @package
 * @param {Function} f
 * @returns {string[]} the body proper of 'f'
 */
function bodyString (f) {
  const result = []

  // break into lines, keeping only the body
  let lines = f.toString().split('\n')
  lines = lines.slice(1, lines.length - 1)

  // determine the indent amount
  const n = lines[0].length - lines[0].trimStart().length

  // keep all lines that are not to be skipped
  for (const elt of lines) {
    const s = elt.substring(n).trimEnd()
    if (!s.endsWith('// skip')) result.push(s)
  }

  return result
}

/**
 * What are the examples at *path*?
 * @param {string} path
 */
function examples (path, module = {}) {
  /*
   * This can't be replaced by a require -- that won't work
   * when trying to document ES6 modules
   */
  const str = fs.readFileSync(path, 'utf-8')
  const vm = new NodeVM()
  return vm.run(str)(module)
}

module.exports = {
  bodyString: bodyString,
  examples: examples
}
