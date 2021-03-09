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
