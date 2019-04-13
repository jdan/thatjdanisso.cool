---
title: A Frontend Programmer's Guide to Languages
route: /programming-languages
date: 2019-04-13
description:
hidden: true
---

Today, we're going to make a programming language.

No, it won't take a PhD, or years of your time (or even days for that matter). You and I, together, are going to learn what a programming language _is_ and actually build one that can evaluate programs.

By the end of this post we'll have written a JavaScript function, `evaluate`, which interprets a small programming language with strings and variables. You won't be going off and rewriting your stack in it (though you're certainly welcome to try!), but I hope it's a fun exercise.

## Hello, world!

To kick things off, we'll write an interpreter for a new HelloWorld language, and use it write a [Hello, world! program](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program).

Here's our goal:

```js
const program = { type: "HelloWorld" };
console.log(evaluate(program));
// => Hello, world!
```

I'm sure you have questions. _Real quick_, let's introduce some terms that we'll more clearly define as we go.

- Our "**program**" is represented by the JavaScript object `{ type: "HelloWorld" }`. Throughout this post, we'll be adding more and more things to this object. For now, there's not much to it.
- Our "**evaluator**" (or "interpreter" - it's your call) is a single JavaScript function that accepts a "**program**."
- We receive a "**value**" from our "**evaluator**," which we send to the wonderful `console.log` function you're all familiar with.

Now let's build our **evaluator**.

```js
function evaluate(node) {
  switch (node.type) {
    case "HelloWorld":
      return "Hello, world!";
    default:
      throw `evaluate -- unknown node type ${node.type}`;
  }
}
```

This function is not terribly interesting, but I'd like to call out a few details.

- Our function accepts a parameter that we call `node` as in, a **node** of a tree. (_dramatic foreshadowing_)
- The crux of this function is a single `switch` statement that operates on the `type` field of our node. Our language is very simple, so we only have a single "node type" (namely, "HelloWorld").
- For the "HelloWorld" **expression** - we return the string "Hello, world!"
- If we see something we don't recognize - we throw an error. The programmer messed up!

At this point we have 8 lines of code that evaluate a simple HelloWorld language. I'll emphasize the _simple_ here, there are no variables, no loops, no modules, not even numbers - but it's a language. Our language has a very small **grammar**, but it's a language.

Let's make things more interesting.

## Strings

In this section we'd like to make a new `HelloStrings` language (marketing wants us to be able to print more than just "Hello, world!") that can produce strings and run two operations on them.

Here's our goal for this section:

```js
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
```

Some initial observations:

- We ditch our "HelloWorld" **expression** in favor of "String," which has a "content" field in addition to the "type" field we used in the previous section.
- We introduce "Excite" which adds exclamation points to expressions.
- We introduce "Append," which also contains expressions in its definition - two of 'em in fact!

Let's start off by creating an **evaluator** to operate "String" expressions.

```js
function evaluate(node) {
  switch (node.type) {
    case "String":
      return node.content;
    default:
      throw `evaluate -- unknown node type ${node.type}`;
  }
}
```

Great, so we replace "HelloWorld" with "String" as the node's type - and return its "content" value instead of the string "Hello, world!"

**_You just wrote a programming language with strings, let's celebrate!_**

But if we continue with our desired code above, we see the following:

```
Apple
evaluate -- unknown node type Excite
```

We can evaluate `{ type: "String", content: "Apple" }` no problem, but we don't know what to do with this "Excite" thing just yet.

So how might we evaluate "Excite" expressions? Based on how it produces "Banana!" in our desired output, we may be inclined to say that "Excite" _takes a string and adds an exclamation point to it_. Simple enough, right? But let's take a closer look.

```js
{
  type: "Excite",
  expression: {
    type: "String",
    content: "Banana"
  }
}
```

The "expression" field of our Excite expression node isn't a string per-se, but an expression in the HelloStrings language! **Our expression contains an expression inside of it!** (Are you beginning to see why our evaluator accepts a `node` as in "nodes of a tree"?)

To illustrate this further, allow me to propose the following, _valid_ program for the HelloStrings language.

```js
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
```

In the above example, we'll evaluate the string "Banana" - excite it to get "Banana!" - than excite _that_ to get "Banana!!" (how exciting!)

Let's begin adding Excite expressions to our language.

```js
function evaluate(node) {
  switch (node.type) {
    case "String":
      return node.content;
    case "Excite":
      // We have this node.expression thing, but what do
      // we do with it?
      ???
    default:
      throw `evaluate -- unknown node type ${node.type}`;
  }
}
```

Rather than just returning a "value" like we did for String expressions (`return node.content`), we'll need to use `node.expression` somehow. As the name suggests, `node.expression` is an expression, and what do we do with expressions?

We evaluate them!

```js
case "Excite":
  return evaluate(node.expression) + "!";
```

`evaluate` is now a recursive function which operates on String and Excite expressions. Here's the function in all its beauty and invitation to implement `Append` yourself.

```js
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
```
