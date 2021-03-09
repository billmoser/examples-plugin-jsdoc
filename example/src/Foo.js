/**
 * Represents all foos
 * If the '@examples' path is a directory, it's assumed to contain
 * examples files for each function, named as '<function name>.js'
 * @examples ./test/data/examples/Foo
 */
class Foo {
  /**
   * Start with a number
   * @param {*} num a number
   */
  constructor (num) {
    this.num = num
  }

  /**
   * What is the bar of str?
   * @param {*} str
   */
  bar (str) {
    return str + this.num
  }

  /**
   * Resets this.num
   * @param {*} num
   */
  reset (num) {
    this.num = num
  }
}

module.exports = Foo
