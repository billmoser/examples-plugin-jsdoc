[![Travis CI w/ Logo](https://travis-ci.org/billmoser/examples-plugin-jsdoc.svg?branch=main)](https://travis-ci.org/billmoser/examples-plugin-jsdoc)
[![CodeCov](https://codecov.io/gh/billmoser/examples-plugin-jsdoc/branch/main/graph/badge.svg)](https://codecov.io/gh/billmoser/examples-plugin-jsdoc)
[![codebeat badge](https://codebeat.co/badges/11522fef-973b-41d8-b1ea-70da1c3cb292)](https://codebeat.co/projects/github-com-billmoser-examples-plugin-jsdoc-main)
[![Generic badge](https://img.shields.io/badge/docs-GHpages-blue.svg)](https://billmoser.github.io/examples-plugin-jsdoc/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Known Vulnerabilities](https://snyk.io/test/github/billmoser/examples-plugin-jsdoc/badge.svg?targetFile=package.json)](https://snyk.io/test/github/billmoser/examples-plugin-jsdoc?targetFile=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

* [Purpose](#purpose)
* [Installation](#installation)
* [Usage option 1: all examples for a module in a single file](#usage-option-1-all-examples-for-a-module-in-a-single-file)
* [Usage option 2: examples for each function in a separate file](#usage-option-2-examples-for-each-function-in-a-separate-file)


<a name="purpose"></a>
# Purpose

With this plugin, you write your examples as plain javascript, and then
include them
- in your jsdoc documentation with the `@examples` tag, and
- in your test suites with a simple test file.

You'll need to be familiar with [JSDoc](https://jsdoc.app/index.html), and with a testing framework such as
[jest](https://jestjs.io/), [jasmine](https://jasmine.github.io/), or [mocha](https://mochajs.org/) (or any other framework that can supply globals for *describe*, *expect*, and *it* that work in the usual way).

Here's a look at the [end result](https://billmoser.github.io/examples-plugin-jsdoc/example-docs/index.html)

<a name="installation"></a>
# Installation

```sh
npm install --save-dev jsdoc-examples
```
Note that the *example* directory contains a complete usage example for the plugin for both documentation, and for testing in each of the three test frameworks mentioned above.

<a name="usage-option-1-all-examples-for-a-module-in-a-single-file"></a>
# Usage option 1: all examples for a module in a single file

All of the examples for a module may be placed in a single file.  The `examples` object contains entries for each function that you wish to include 
examples for in your documentation and tests.  Optionally, a `setup` function can be specified.  The `setup` code will be added to the top level module documentation, and will be called before each example when tests are run.

Each item in the `examples` object is itself an array of specifications
corresponding to 
the examples you wish to document/test for a particular function.  Each object has a key for the example `code`, and optionally, an `expect` key whose value is the expected result of running the example.  There is no need to include the `expect` entry if the example does not return a result.  

The examples file must export a single function named `f`, which takes an instance of the module as its sole argument.  If no setup is required, `f`
may return the examples array directly.  If setup code is required, `f` must
return an object with the form `{examples: examples, setup: setup}`.  The export must be of the form `module.exports =`, even if your project uses es6 modules.  This example provides more details:
```javascript
module.exports = function f (core) {

  // this will appear in an 'Example' section just beneath the module description
  function setup () {
    // caption: Core setup
    core.reset()
  }

  const examples = {
    // each function has it's own named examples section
    addCore: [{ 
        code: () => { // start of function must be on its own line
          /*
           * all lines of the function body proper (including comments like
           * this, and any lines of code) will show up in the documentation,
           * except for lines ending in: '// skip'
           */
          const result = core.addCore(2)
          return result // skip
        }, // function closing bracket must be on its own line
        expect: 2 // specify a result for both test verification and display
      }, {
        code: () => {
          // This is a simple example:
          core.addCore(1)
        }
      }, {
        code: () => {
          core.addCore(2)
        }
      }],

    numCores: [{
        code: () => {
          // caption: a superfluous caption
          const result = core.numCores()
        }
    }]
  }

  return { examples: examples, setup: setup }
}

```
In order to include the examples in your documentation, simply add an 
`@examples` tag containing the path to your examples in the top-level module
documentation, as shown here:
```javascript
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

```
To include the examples in your testing, create a *.test.js* file that uses this plugin's `testAll` to run the tests, as in this example:
```javascript
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

```

<a name="usage-option-2-examples-for-each-function-in-a-separate-file"></a>
# Usage option 2: examples for each function in a separate file

Alternatively, separate examples files can be used to document a module's functions.  To use this method for a module, create a directory for the examples files.  Then, for each function, add a file (named for the function) to contain the examples for that function.  The format of these files is similar to
the one above, but here, there is no need to tag the example with the function name.  So, `examples` is now just the array of specifications described above.
As above, each file may include a `setup` function, and must export the function `f`.  Here's an example with more details:
```javascript
module.exports = function f (Foo) {
  const examples = [
    {
      code: () => {
        // this is how to instantiate
        let foo = new Foo(2)
      }
    }
  ]

  return examples
}
```
In order to include the examples in your documentation, simply add an 
`@examples` tag containing the path to your examples *directory* in the top-level module documentation, as shown here:
```javascript
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

```
As for option 1, to include the examples in your testing, create a *.test.js* file that uses this plugin's `testAll` to run the tests.