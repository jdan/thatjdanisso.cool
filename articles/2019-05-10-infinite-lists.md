---
title: Operating on Infinite Lists
route: /infinite-lists
date: 2019-05-10
---

Today we're going to step through one of my favorite exercises in composing functions - building and operating on infinite streams of data.

The question we'll be answering is: How might you represent the following operations?

```js
nums
// =>  1, 2, 3, 4, ...
double(nums)
// =>  2, 4, 6, 8, ...
fib
// =>  0, 1, 1, 2, 3, 5, 8, ...
```

This post contains code written in JavaScript, but the ideas here apply to any language with functions and lists.

## The Finite

We can build a finite list in JavaScript like so:

```js
const ls = [1, 2, 3, 4, 5]
// => [1, 2, 3, 4, 5]
```

We can access any element inside of it as well as its length:

```js
ls[0]
// => 1
ls[10]
// => undefined
ls.length
// => 5
```

Alternatively, we can self-referentially represent lists as **an element, followed by a list**. This is commonly referred to as a "linked list." (You're welcome to scroll to the next section if this is familiar to you. You're welcome either way I guess, I'm not a cop.)

In this data structure we'll use an object with a `first` field for the element and a `rest` field for the rest of the list. We'll use `null` for the empty list - where our list ends.

```js
const ll = {
  first: 0,
  rest: {
    first: 1,
    rest: {
      first: 2,
      rest: null,
    },
  }
}
```

This is conceptually simpler, but pretty awkward (imagine if you had to use this instead of `[...]`!). Still, we can access elements inside of it:

```js
ll.first
// => 0
ll.rest.first
// => 1
ll.rest.rest.first
// => 2
```

And we can compute its length using recursion (where our function is defined in terms of itself):

```js
function length(ll) {
  if (ll === null) {
    // empty list has length 0
    return 0
  } else {
    // its length is 1 (the item)
    // plus the length of the rest
    return 1 + length(ll.rest)
  }
}
length(ll)
// => 3
```

## The Infinite

Conceptually, an infinite list is a lot like a finite list. We'll want a way to get an item, and a way to get the rest. Let's kick things off by building a stream of ones: 

```js
1, 1, 1, 1, ...
```

Our `first` will be a single piece of data in our stream - in this case, the number 1.

```js
const ones = {
  first: 1,
  rest: ???,
}
```

In our linked list above, our `rest` was also a linked list. Similarly, the `rest` of our stream will be... a stream!

```js
const ones = {
  first: 1,
  rest: ones,
}
```

You'll quickly find however, that we can't just define a variable in terms of itself. In JavaScript, we'll receive the following from our console:

```
ReferenceError: ones is not defined
```

What *can* we define in terms of itself? Functions! Remember `length` from above?

```js
function length(ll) {
  if (ll === null) {
    return 0
  } else {
    return 1 + length(ll.rest)
  }
}
```

So...**let's switch `ones` to be a function**:

```js
function ones() {
  return {
    first: 1,
    rest: ones(),
  }
}
```

But, we're not in the clear just yet:

```js
> ones()
RangeError: Maximum call stack size exceeded
    at ones (repl:1:14)
    at ones (repl:4:11)
    at ones (repl:4:11)
```

Uh oh. When creating our stream, `ones` is **eagerly** making subsequent calls to itself over and over again - never coming up for air before our JavaScript console lets us know we probably messed up.

Instead, let's make our implementation **lazier** by returning the `ones` function and calling it when we need it.

```js
function ones() {
  return {
    first: 1,
    rest: ones,
  }
}

ones()
// => { first: 1, rest: [Function: ones] }
```

No infinite loops! We can create a ones stream, and gather elements from it like so:

```js
ones().first
// => 1
ones().rest().first
// => 1
ones().rest().rest().first
// => 1
```

## Defining and Building Streams

Taking a step back, we can define a **stream** as a function which returns two things:

(1) an item<br>
(2) a stream

We can define a `twos` stream similarly to our `ones`:

```js
function twos() {
  return {
    first: 2,
    rest: twos,
  }
}

twos().first
// => 2
twos().rest().first
// => 2
twos().rest().rest().first
// => 2
```

Still, these streams don't seem particularly _useful_. One potential smell is our streams are functions, but so far they haven't taken any arguments. What if they did?

Let's kick things off with a stream of the natural numbers.

```js
function nums(n) {
  return {
    first: n,
    // Remember, rest is a stream,
    // and streams are functions.
    rest: () => nums(n + 1)
  }
}

nums(1).first
// => 1
nums(1).rest().first
// => 2
nums(1).rest().rest().first
// => 3
nums(999).first
// => 999
```

An initial argument for `nums` doesn't seem particuarly useful, so let's use a default.

```js
function nums(n = 1) {
  return {
    first: n,
    // Remember, rest is a stream,
    // and streams are functions.
    rest: () => nums(n + 1)
  }
}

nums().first
// => 1
```

All these `.rest()`/`.first` chains are becoming cumbersome, so let's take a second and define a function to grab the first `n` elements of a stream.

```js
function take(stream, n) {
  if (n <= 0) {
    return []
  } else {
    const {first, rest} = stream()
    return [first].concat(take(rest, n - 1));
  }
}

take(nums, 5)
// => [1, 2, 3, 4, 5]
```

**Exercise: Write a function to grab the `nth` item of a stream**

```js
nth(nums, 100)
// => 101
```

<details>
<summary>Solution</summary>

<pre><code>function nth(stream, n) {
  if (n < 0) return null
  
  const {first, rest} = stream()
  if (n === 0) {
    return first
  } else {
    return nth(rest, n - 1)
  }
} 
</code></pre>
</details>

At this point we have a stream with some interesting data in it.

Now it's your turn. Try the following examples on your own machine. The solutions can be expanded if you get stuck (and it's okay if you do!)

**Define a stream which returns the odd numbers.**

```
take(odds, 5)
// => [1, 3, 5, 7, 9]
```

<details>
<summary>Solution</summary>
<pre><code>function odds(n = 0) {
  return {
    first: 2 * n + 1,
    rest: () => odds(n + 1),
  }
}
</code></pre>
</details>

**Define a stream which returns the square numbers.**

```js
take(squares, 5)
// => [1, 4, 9, 16, 25]
```

<details>
<summary>Solution</summary>

<pre><code>function squares(n = 1) {
  return {
    first: n * n,
    rest: () => squares(n + 1),
  }
}
</code></pre>
</details>

**Define a stream which loops between 0 and 1.**

```js
take(flipFlop, 5)
// => [0, 1, 0, 1, 0]
```

<details>
<summary>Solution</summary>

<pre><code>function flipFlop(n = 0) {
  return {
    first: n % 2,
    rest: () => flipFlop(n + 1),
  }
}
</code></pre>
</details>

Right on. Feel free to take a break, refill your water, and we'll continue onto the next section - writing functions to operate on our streams.

## Streams Out / Streams In

Now that we're comfortable creating streams, let's start writing functions that can create streams for us.

To kick things off, let's write a function that takes in a number and **returns a stream** of that number.

```js
function fixed(n) {
  // Streams are functions
  return () => ({
    // Which return an item...
    first: n,

    // ...and a stream
    rest: fixed(n),
  })
}

const sevens = fixed(7)
take(sevens, 5)
// => [7, 7, 7, 7, 7]
```

Our pattern here is a little different than the `ones` and `twos` from earlier - in particular we're **returning a function** instead of an object with `first` and `rest`. 

Additionally, our value for `rest` is a little simpler since `fixed(n)` returns a function (we don't need to make a new one inline like before).

For our next example, let's recall our definitions for `odds`, `squares`, and `flipFlop`. Specifically, just the `first` and `rest` parts of each.

```
odds
  first: 2 * n + 1,
  rest: () => odds(n + 1),

squares
  first: n * n,
  rest: () => odds(n + 1),

flipFlop
  first: n % 2,
  rest: () => odds(n + 1),
```

Interestingly, our three streams share the same `rest`! And the `first` is just a function of `n`. 

Let's materialize this some more, by building a function `funcStream` to generalize our three examples.

```js
function funcStream(f, n = 0) {
  return () => ({
    first: f(n),
    rest: funcStream(f, n + 1),
  })
}

take(funcStream(n => 2 * n + 1), 5)
// => [1, 3, 5, 7, 9]
take(funcStream(n => n * n), 5)
// => [0, 1, 4, 9, 16]
take(funcStream(n => n % 2), 5)
// => [0, 1, 0, 1, 0]
```

Not bad - but we can do better. `funcStream` still needs to keep track of its own `n` and update it appropriately, but `nums` can do that for us. **What if our function operated on `nums`, or _any stream_ for that matter?**

We can think of this as a "map" equivalent for streams. Here's how we might do it:

```js
function map(f, stream) {
  return () => {
    const {first, rest} = stream()

    return {
      first: f(first),
      rest: map(f, rest),
    }
  }
}

take(map(n => 2 * n, nums), 5)
// => [0, 2, 4, 6, 8]
```

Using this, we can define functions to operate on streams:

```js
const double =
  (stream) => map(n => 2 * n, stream)
take(double(nums), 5)
// => [0, 2, 4, 6, 8]
```

Better yet, these functions can **compose**.

```js
take(double(double(nums)), 5)
// => [0, 4, 8, 12, 16]
```

Let's take stock. `nums` is an **infinite stream of numbers**, and we're able to apply a function to it. Under the hood, this function is **lazily** invoked when we need it - such as when we display the output with `take`.

But mapping isn't the only thing we do with finite lists, so it shouldn't be the only thing we do with streams. **What if we wanted to filter a stream?**

```js
take(filter(n => n % 3 > 0, nums), 6)
// => [1, 2, 4, 5, 7, 8]
```

When filtering a stream, we'll grab it's `first` and `rest`, then test `first`. If the test passes (and the function passed into `filter` returns true), we'll make sure to include that in the stream.

If the test does not pass, we'll just filter the `tail` and ignore the `first`. Let's turn this into code:

```js
function filter(f, stream) {
  const {first, rest} = stream()
  if (f(first)) {
    // Streams are functions
    return () => ({
      first: first,
      rest: filter(f, rest),
    })
  } else {
    // Ignore first, filter rest
    return filter(f, rest)
  }
}
```

And just like that, we now have a `filter` that operates on an infinite stream of data.

```js
take(filter(n => n % 2 > 0, nums), 5)
// => [1, 3, 5, 7, 9]
take(filter(_ => true, nums), 5)
// => [0, 1, 2, 3, 4]
take(filter(_ => Math.random() < 0.05, nums), 5)
// => [28, 31, 33, 37, 54]
```

## Closing Exercises

Before you go, try your hand at the following exercises. 

**Using `map`, create a [FizzBuzz](https://en.wikipedia.org/wiki/Fizz_buzz) stream.**

```js
take(fizzbuzz, 5)
// => [1, 2, 'Fizz', 4, 'Buzz']
```

<details>
<summary>Solution</summary>

<pre><code>const fizzbuzz = map(n => {
  if (n % 15 === 0) {
    return 'FizzBuzz'
  } else if (n % 3 === 0) {
    return 'Fizz'
  } else if (n % 5 === 0) {
    return 'Buzz'
  } else {
    return n
  }
}, nums)
</code></pre>
</details>

**Using `map` and `nums`, write a function that takes two values and produces a stream that toggles between them.**

```js
take(toggle('hi', 'ho'), 5)
// => ['hi', 'ho', 'hi', 'ho', 'hi']
```

<details>
<summary>Solution</summary>

<pre><code>function toggle(a, b) {
  return map(
    // nums starts at 1
    n => (n - 1) % 2 === 0 ? a : b,
    nums
  )
}
</code></pre>
</details>

**Using `map` and `nums`, write a function that takes an array of values and produces a stream that cycles between them.**

```js
take(cycle(['a', 'b', 'c']), 5)
// => ['a', 'b', 'c', 'a', 'b']
```

<details>
<summary>Solution</summary>

<pre><code>function cycle(items) {
  return map(
    // nums starts at 1
    n => items[(n - 1) % items.length],
    nums
  )
}
</code></pre>
</details>

**Write a function that takes two streams and interleaves them.**

```js
take(interleave(fixed(0), fixed(9)), 5)
// => [0, 9, 0, 9, 0]
```

<details>
<summary>Solution</summary>

<pre><code>function interleave(a, b) {
  const aPair = a()
  const bPair = b()
  
  return () => ({
    first: aPair.first,
    rest: () => ({
      first: bPair.first,
      rest: interleave(aPair.rest, bPair.rest),
    })
  })
}
</code></pre>
</details>

**Write a function which accepts a stream and returns a new stream whose values are a running total of the original stream.**

For `nums`: return 1, then 1 + 2, then 1 + 2 + 3, then 1 + 2 + 3 + 4, etc.

```js
take(total(nums), 6)
// => [1, 3, 6, 10, 15, 21]
```

_Hint: give `total` a second argument that defaults to 0_

<details>
<summary>Solution</summary>

<pre><code>function total(stream, value = 0) {
  return () => {
    const pair = stream()
    return {
      first: value + pair.first,
      rest: total(pair.rest, value + pair.first),
    }
  }
}
</code></pre>
</details>

**Write `reduce` for streams.**

`reduce` should take a 2-argument accumulator function, an initial value, and a stream.

```js
take(reduce(
  (acc, value) => acc + value,
  0,
  nums
), 6)
// => [1, 3, 6, 10, 15, 21]
take(reduce(
  (acc, value) => acc * value,
  1,
  nums
), 6)
// => [1, 2, 6, 24, 120, 720]
```

_Hint: Generalize your solution for `total`._

<details>
<summary>Solution</summary>

<pre><code>function reduce(fn, init, stream) {
  return () => {
    const pair = stream()
    const newValue = fn(init, pair.first)
    return {
      first: newValue,
      rest: reduce(fn, newValue, pair.rest),
    }
  }
}
</code></pre>
</details>

**Using `map` and `reduce`, create a stream of the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).**

```js
take(fib, 8)
// => [0, 1, 1, 2, 3, 5, 8, 13]
```

_Hint #1: Your initial value should be the first **two** values of the sequence._

_Hint #2: You do not need to use the input stream's values._

<details>
<summary>Solution</summary>

<pre><code>function fib() {
  return {
    // 
    first: 0,
    rest: map(
      pair => pair[0],
      reduce(
        ([a, b], _) => [b, a + b],
        [0, 1],
        fixed('foobar')
      )
    )
  }
}
</code></pre>
</details><br>

## 🎉🎉

Using nothing but functions and some JavaScript objects, we were able to create and modify infinite sequences of data - and we did it all without making our computer cry!

Thanks for reading this post, and an extra special thanks if you took the time to go through the exercises I put together after lots of editing. I really appreciate it. If not, you may want to try them out on a rainy day, I bet you'll learn something!

It would be a mistake to leave you without some links for further reading.

* [Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-4.html#%_toc_start) is my favorite text on how to write and compose programs. Specifically, [Section 3.5](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-24.html#%_sec_3.5) talk about streams that look eerily similar to the ones in this post. That's no accident!
* My first introduction to this data structure was in Dan Grossman's [Programming Languages course on Coursera](https://www.coursera.org/learn/programming-languages). I had an absolute blast with this one, and learned a ton about FP, OOP, and type systems. I _highly_ recommend it.
* Lastly, if you like the idea of infinite sequences but want to use more modern JS instead of first principles, [Reginald Braithwaite has written extensively on the topic](https://raganwald.com/2019/03/11/enumerations-denumerables-recursion-infinity.html). 

That's all I have for you now. Thanks again for reading, feel free to share on social media, and [come work with me at Stripe (we're hiring almost everywhere!)](https://stripe.com/jobs)
