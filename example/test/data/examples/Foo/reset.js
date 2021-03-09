module.exports = function f (Foo) {
  return [
    {
      code: () => {
        let foo = new Foo(1)
        foo.reset(1)
      }
    }
  ]
}