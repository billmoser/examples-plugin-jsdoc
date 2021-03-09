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