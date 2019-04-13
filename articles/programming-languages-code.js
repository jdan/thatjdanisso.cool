/*
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

console.log(evaluate({ type: "Blah" }));*/

function evaluate(node) {
  switch (node.type) {
    case "String":
      return node.content;
    case "Excite":
      return evaluate(node.expression) + "!";
    default:
      throw `evaluate -- unknown node type ${node.type}`;
  }
}

console.log(
  evaluate({
    type: "String",
    content: "Apple"
  })
);
// => Apple

console.log(
  evaluate({
    type: "Excite",
    expression: {
      type: "Excite",
      expression: {
        type: "String",
        content: "Banana"
      }
    }
  })
);
// => Banana!!

console.log(
  evaluate({
    type: "Excite",
    expression: {
      type: "String",
      content: "Banana"
    }
  })
);
// => Banana!

console.log(
  evaluate({
    type: "Append",
    first: {
      type: "String",
      content: "Apple"
    },
    second: {
      type: "Excite",
      expression: {
        type: "String",
        content: "Banana"
      }
    }
  })
);
// => AppleBanana!

function evaluate(node) {
  switch (node.type) {
    case "String":
      return node.content;
    case "Excite":
      return evaluate(node.expression) + "!";
    case "Append":
    // Now it's your turn, how might we evaluate
    // Append expressions?
    default:
      throw `evaluate -- unknown node type ${node.type}`;
  }
}
