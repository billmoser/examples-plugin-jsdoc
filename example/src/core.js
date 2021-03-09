/**
 * @module core
 * @description desc of core
 * If '@examples' is a file, all examples will be loaded from there:
 * @examples ./test/data/examples/core-examples.js
 */

let _numCores = 0

/**
 * @description If '@examples' ends in .js, it's assumed to
 * contain examples for this function
 * @param {number} num
 * @returns {number} zero
 */
function addCore (num = 1) {
  _numCores += num
  return _numCores
}

/**
 * @description ns desc
 * @returns {number} number of cores
 */
function numCores () {
  return _numCores
}

/**
 * No examples yet...
 */
function reset () {
  _numCores = 0
}

module.exports = { addCore: addCore, numCores: numCores, reset: reset }
