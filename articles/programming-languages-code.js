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

console.log(evaluate({ type: "Blah" }));

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

*/

function lookup(env, name) {
  return env[name]
}

function extendEnv(env, name, value) {
  return {
    ...env,
    [name]: value,
  }
}

function evaluate(node, env) {
  switch (node.type) {
    case "String":
      return node.content
    case "Excite":
      return evaluate(node.expression, env) + "!"
    case "Append":
      return evaluate(node.first, env) + evaluate(node.second, env)
    case "Variable":
      return lookup(env, node.name)
    case "Let":
      let inner = node.expression
      let value = evaluate(node.value, env)
      let newEnv = extendEnv(env, node.name, value)

      return evaluate(node.expression, newEnv)
    default:
      throw `evaluate -- unknown node type ${node.type}`
  }
}

console.log(
  evaluate({
    type: "String",
    content: "Apple",
  })
)
// => Apple

console.log(
  evaluate({
    type: "Excite",
    expression: {
      type: "String",
      content: "Banana",
    },
  })
)
// => Banana!

console.log(
  evaluate({
    type: "Append",
    first: {
      type: "String",
      content: "Apple",
    },
    second: {
      type: "Excite",
      expression: {
        type: "String",
        content: "Banana",
      },
    },
  })
)
// => AppleBanana!

console.log(
  evaluate(
    {
      type: "Let",
      name: "x",
      value: {
        type: "String",
        content: "Hello, world",
      },
      expression: {
        type: "Excite",
        expression: {
          type: "Variable",
          name: "x",
        },
      },
    },
    {}
  )
)
// => Hello, world!

console.log(
  evaluate({
    type: "Excite",
    expression: {
      type: "Excite",
      expression: {
        type: "String",
        content: "Banana",
      },
    },
  })
)
