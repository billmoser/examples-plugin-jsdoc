module.exports = function f (Foo) {
  const examples = [{
    code: () => {
      // This is a simple example
      let foo = new Foo(1)
      let result = foo.bar('hi')
      return result // skip
    },
    expect: 'hi1'
  }]

  return { examples: examples }
}