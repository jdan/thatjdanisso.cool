---
title: A Frontend Programmer's Guide to Languages
route: /programming-languages
date: 2019-04-13
description: Today, we're going to make a programming language. No, it won't take a PhD, or years of your time (or even days for that matter). You and I, together, are going to learn what a programming language is and actually build one that can evaluate programs.
---

Today, we're going to make a programming language.

No, it won't take a PhD, or years of your time (or even days for that matter). You and I, together, are going to learn what a programming language _is_ and actually build one that can evaluate programs.

By the end of this post we'll have written a JavaScript function, `evaluate`, which interprets a small programming language with strings and variables. You won't be going off and rewriting your stack in it (though you're certainly welcome to try!), but I hope it's a fun exercise.

I encourage you to copy the code examples in your editor of choice and actually run them. You should be able to make it through this post in a single listen of [Lights - Little Machines](https://open.spotify.com/album/1u8OmwItT46Y1gD2xKAK9D?si=CcY4GgT4TGyOa7eNcnLqTA).

## Hello, world!

To kick things off, we'll write an interpreter for a new HelloWorld language, and use it write a [Hello, world! program](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program).

Here's our goal:

```js
const program = { type: "HelloWorld" }
console.log(evaluate(program))
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
      return "Hello, world!"
    default:
      throw `evaluate -- unknown node type ${node.type}`
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
```

Some initial observations:

- We ditch our "HelloWorld" **expression** in favor of "String," which has a "content" field in addition to the "type" field we used in the previous section.
- We introduce "Excite" which adds exclamation points to expressions.
- We introduce "Append," which also contains expressions in its definition - two of 'em in fact!

Let's start off by creating an **evaluator** to operate on "String" expressions.

```js
function evaluate(node) {
  switch (node.type) {
    case "String":
      return node.content
    default:
      throw `evaluate -- unknown node type ${node.type}`
  }
}
```

Great, so we replace "HelloWorld" with "String" as the node's type - and return its "content" value instead of the string "Hello, world!"

**_You just wrote a programming language with strings, let's celebrate!_**

But if we continue with our desired goal above, we see the following:

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

The "expression" field of our Excite expression node isn't a string per se, but an expression in the HelloStrings language! **Our expression contains an expression inside of it!** (Are you beginning to see why our evaluator accepts a `node` as in "nodes of a tree"?)

To illustrate this further, allow me to propose the following, _valid_ program for the HelloStrings language.

```js
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
```

In the above example, we'll evaluate the string "Banana" - excite it to get "Banana!" - than excite _that_ to get "Banana!!" (how very exciting!)

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

`evaluate` is now a recursive function which operates on String and Excite expressions. Here's the function in all its glory and an invitation to implement `Append` yourself.

```js
function evaluate(node) {
  switch (node.type) {
    case "String":
      return node.content
    case "Excite":
      return evaluate(node.expression) + "!"
    case "Append":
    // Now it's your turn, how might we evaluate
    // Append expressions?
    default:
      throw `evaluate -- unknown node type ${node.type}`
  }
}
```

## Variables

At this point we have a small language which can produce strings with "Excite" and "Append" statements. Nice job if you've made it this far!

Let's use this momentum and expand our language to support a very popular language construct - **variables**.

By the end of this section, we'll have a language which can declare and retrieve the value of variables in HelloStrings expressions.

```js
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
```

There's a lot there, so let's break it down.

- `evaluate` now takes a second argument (_dramatic foreshadowing_)
- We introduce a new "Variable" expression, which will **lookup** a variable by its name.
- We introduce a "Let" expression, which makes a new variable with a "name" and a "value" (the value being an expression in our language!), and uses that when evaluating an inner **expression**.

In our case, we're setting "x" to the evaluation of a "Hello, world" String, then retrieving the value of "x" to Excite it.

Let's start by adding "Variable" expressions to `evaluate`.

```js
function evaluate(node) {
  switch (node.type) {
    case "Variable":
      // We have `node.name`, but what to do with it?
    ...
  }
}
```

Consider the following code:

```js
evaluate({ type: "Variable", name: "x" })
```

Here we want to evaluate the variable `x`, but there doesn't seem to be much to work with. In a typical programming language, what we might we do with a variable?

We look it up!

```js
function evaluate(node) {
  switch (node.type) {
    case "Variable":
      return lookup(node.name);
    ...
  }
}

```

In order for `lookup` to do anything meaningful, we need to provide it with some sort of **environment** - a collection of variable names and values. We'll call this `env`.

```js
function evaluate(node) {
  switch (node.type) {
    case "Variable":
      return lookup(env, node.name);
    ...
  }
}

```

And where does `env` come from? Rather unfortunately we can't make it out of thin air (believe me, I tried for many hours), but we _can_ **pass it in to our evaluator.**

```js
function evaluate(node, env) {
  switch (node.type) {
    case "Variable":
      return lookup(env, node.name)
    case "String":
      return node.content
    case "Excite":
      return evaluate(node.expression, env) + "!"
    case "Append":
    // Left as an exercise to the reader
    default:
      throw `evaluate -- unknown node type ${node.type}`
  }
}
```

_Remember to add `env` to our recursive calls in Excite and Append (you did implement Append, right?)_

Let's define `lookup`. For simplicity's sake, we'll say an environment is a JavaScript object with `name` keys and `value` values.

```js
function lookup(env, name) {
  return env[name]
}
```

Simple, right?

```js
console.log(evaluate({ type: "Variable", name: "x" }, { x: "Hello, world!" }))
// => Hello, world!
```

**Congratulations you just added variables to your language!**

Last but not least, we'll want an easy way to create new variables. Without this, we'll be evaluating Excite's and Append's with nothing more than a bunch of global variables - and the marketing department _definitely_ doesn't want that.

Let's start by listing what a "Let" expression actually contains:

```js
{
  type: "Let",
  name: "x",
  value: {
    type: "String",
    content: "Hello, world"
  },
  expression: {
    type: "Excite",
    expression: {
      type: "Variable",
      name: "x"
    }
  }
}
```

- A "Let" type
- A "name" field for naming our new variable
- A "value" field for giving our new variable a value
- An "expression" field to use our new variable in!

Excellent, now let's get started on implementing the thing.

```js
function evaluate(node, env) {
  switch (node.type) {
    case "Variable":
      return lookup(env, node.name);
    case "Let":
      let newEnv = ???
      return evaluate(node.expression, newEnv);
    ...
  }
}
```

We'll be **adding a new variable to our environment**, and using that to evaluate our expression. For simplicity's sake, let's give ourselves an `extendEnv` function to do this.

```js
function evaluate(node, env) {
  switch (node.type) {
    case "Variable":
      return lookup(env, node.name);
    case "Let":
      let name = ???
      let value = ???
      let newEnv = extendEnv(env, name, value)
      return evaluate(node.expression, newEnv);
    ...
  }
}
```

`name` is simple, that's just `node.name`. For `value`, however, we'll be given a _HelloStrings expression_ to evaluate.

```js
{
  type: "Let",
  name: "x",
  value: {
    type: "String",
    content: "Hello, world"
  },
  ...
}
```

Still, it's not much code :)

```js
function evaluate(node, env) {
  switch (node.type) {
    case "Variable":
      return lookup(env, node.name);
    case "Let":
      let name = node.name;
      let value = evaluate(node.value, env);
      let newEnv = extendEnv(env, name, value);
      return evaluate(node.expression, newEnv);
    ...
  }
}
```

Finally, `extendEnv`.

Our `env` is a simple JavaScript object that maps `names` to `values`. We'll need to extend an `env` with a _new_ name and value pair. We can do so with `Object.assign`:

```js
function extendEnv(env, name, value) {
  let envAddition = {}
  envAddition[name] = value

  return Object.assign({}, env, envAddition)
}
```

Or, using some of the latest and greatest JavaScript features:

```js
function extendEnv(env, name, value) {
  return {
    ...env,
    [name]: value,
  }
}
```

Putting it all together, the combination of `lookup`, `extendEnv`, and `evaluate` completes the language.

```js
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
    // Left as an exercise to the reader
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
```

## Closing notes and things to ponder

If you made it to the end of this post, congratulations and thank you :)

We developed a language and an evaluator that processes [Abstract Syntax Trees](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (or ASTs for short, but I just called 'em nodes for simplicity). Our language has [constants](https://en.wikipedia.org/wiki/Constant_(computer_programming), some small expressions to operate on strings, and [variables](https://en.wikipedia.org/wiki/Variable_(computer_science).

But this is only the beginning! You are ending this article with an `evaluate` function that can grow to support all sorts of common language features (numbers, comments, functions), the only limit is your imagination.

I'd like to leave you with a few concrete exercises, should you wish to revisit your new language on a rainy day:

- How might we add Numbers to our language? How about operations to Add and Multiply them? What about _rational_ numbers (fractions with a numerator and a denominator)?
- As we saw earlier, we can kickstart our `env` by populating it with global values. Could we add functions to this environment? How might we call them from our language?
- Can we take our abstract syntax tree and use it to generate JavaScript code? How about Ruby code?
- Writing our programs in as JavaScript objects doesn't seem to scale well. How might we go about creating a **syntax** for our language and converting that to an AST?

I'll also go ahead and plug some of my favorite resources on Programming Languages.

- Dan Grossman's [Programming Languages on Coursera](https://www.coursera.org/learn/programming-languages) is an entirely free, entirely amazing three-part course for learning the ins and outs of different types of programming languages. I can't recommend it enough.
- This article is inspired in no short part by [@jamiebuilds's super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler). I encourage you to check out the code to see some of the concepts introduced in this article in more detail.
- [Crafting Interpreters](https://craftinginterpreters.com/) is an effort to build "a handbook for making programming languages." An ambitious goal, but it's completely free and chock full of different interpreter concepts.

That's all for now. If you liked this article feel free to share it and follow me on Twitter while you're at it: [@jdan](https://twitter.com/jdan).

Thanks again for reading,<br />
Jordan
