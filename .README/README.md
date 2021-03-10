[![Travis CI w/ Logo](https://travis-ci.org/billmoser/examples-plugin-jsdoc.svg?branch=main)](https://travis-ci.org/billmoser/examples-plugin-jsdoc)
[![CodeCov](https://codecov.io/gh/billmoser/examples-plugin-jsdoc/branch/main/graph/badge.svg)](https://codecov.io/gh/billmoser/examples-plugin-jsdoc)
[![codebeat badge](https://codebeat.co/badges/11522fef-973b-41d8-b1ea-70da1c3cb292)](https://codebeat.co/projects/github-com-billmoser-examples-plugin-jsdoc-main)
[![Generic badge](https://img.shields.io/badge/docs-GHpages-blue.svg)](https://billmoser.github.io/examples-plugin-jsdoc/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Known Vulnerabilities](https://snyk.io/test/github/billmoser/examples-plugin-jsdoc/badge.svg?targetFile=package.json)](https://snyk.io/test/github/billmoser/examples-plugin-jsdoc?targetFile=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
{"gitdown": "contents", "maxLevel": 4}

Note for those viewing this on npmjs.org: the real documentation is at [Github Pages](https://billmoser.github.io/examples-plugin-jsdoc/).  If not
viewing this from the Github pages site, you may run into broken links, and inexplicable references to sidebars.

# Purpose

With this plugin, you write your examples as plain javascript, and then
include them
- in your jsdoc documentation with the `@examples` tag, and
- in your test suites with a simple test file.

You'll need to be familiar with [JSDoc](https://jsdoc.app/index.html), and with a testing framework such as
[jest](https://jestjs.io/), [jasmine](https://jasmine.github.io/), or [mocha](https://mochajs.org/) (or any other framework that can supply globals for *describe*, *expect*, and *it* that work in the usual way).

Here's a look at the 
<a href="./example-docs/index.html" target="_blank">end result</a>.  For reference, the sidebar links to documentation for this plugin's source code.  There's no need to look at this as an end-user of the plugin.

# Installation

```sh
npm install --save-dev jsdoc-examples
```
Note that the *example* directory contains a complete usage example for the plugin for both documentation, and for testing in each of the three test frameworks mentioned above.

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
{"gitdown": "include", "file": "../example/test/data/examples/core-examples.js"}
```
In order to include the examples in your documentation, simply add an 
`@examples` tag containing the path to your examples in the top-level module
documentation, as shown here:
```javascript
{"gitdown": "include", "file": "../example/src/core.js"}
```
To include the examples in your testing, create a *.test.js* file that uses this plugin's `testAll` to run the tests, as in this example:
```javascript
{"gitdown": "include", "file": "../example/test/examples.test.js"}
```

# Usage option 2: examples for each function in a separate file

Alternatively, separate examples files can be used to document a module's functions.  To use this method for a module, create a directory for the examples files.  Then, for each function, add a file (named for the function) to contain the examples for that function.  The format of these files is similar to
the one above, but here, there is no need to tag the example with the function name.  So, `examples` is now just the array of specifications described above.
As above, each file may include a `setup` function, and must export the function `f`.  Here's an example with more details:
```javascript
{"gitdown": "include", "file": "../example/test/data/examples/Foo/Foo.js"}
```
In order to include the examples in your documentation, simply add an 
`@examples` tag containing the path to your examples *directory* in the top-level module documentation, as shown here:
```javascript
{"gitdown": "include", "file": "../example/src/Foo.js"}
```
As for option 1, to include the examples in your testing, create a *.test.js* file that uses this plugin's `testAll` to run the tests.