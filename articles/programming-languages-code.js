function evaluate(node) {
  switch (node.type) {
    case "HelloWorld":
      return "Hello, world!";
    default:
      throw `evaluate -- unknown node type ${node.type}`;
  }
}

const program = { type: "HelloWorld" };
console.log(evaluate(program));
// => Hello, world!

console.log(evaluate({ type: "HelloWorld" }));
console.log(evaluate({ type: "Blah" }));
