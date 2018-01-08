---
title: Hello, J - The Fibonacci Numbers
route: /j-fibonacci
date: 2018-01-07
description: Today we're going to write the Fibonacci sequence using a fun language called J.
---

Today we're going to compute the [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) using a [fun language called J](https://en.wikipedia.org/wiki/J_(programming_language).

You are welcome to [skip right to the action](#all-together-now-fibonacci) to see what this post is all about, but the following few paragraphs will introduce some J basics.

## Hello, REPL!

First thing's first, [go ahead and install J](http://code.jsoftware.com/wiki/System/Installation/All-in-One). I tend to run my code in `jconsole`, but `jqt` gives you a nice GUI with a package manager.

In this post you'll find a number of code blocks. These represent lines from the J REPL. The top line, indented by two spaces, is our input. The line beneath is our output.

```
  1 + 1
2
  2 * 3 * 4    NB. this is a comment
24
  'hello, world!'
hello, world!
```

Easy enough, right?

## Lists lists and more lists

J really shines when it comes to lists - and we'll use 'em to build our sequence. You can built lists just by writing the elements separated with whitespace. Seriously.

```
  1 2 3
1 2 3
```

The `{.` verb (or function) is used to get the first element of a list. We can use it by just plopping it in the front.

```
  {. 1 2 3
1
  {. 10 17 100
10
```

The `{:` verb is used to get the last element of the list.

```
  {: 1 2 3
3
  {: 10 17 100
100
  {: 1
1
```

The `,` verb is used to join lists. You'll notice that this one is different in that it has stuff on both sides! Kinda like `+`.

```
  1 , 2
1 2
  1 2 3 , 4 5 6
1 2 3 4 5 6
```

We can use the verb `+/` to sum the elements of a list.

```
  +/ 1 2 3
6
  +/ _1 5   NB. _ is for negative!
4
```

## Stacking verbs

We can use multiple verbs in an expression. Parentheses `()` help us control the order of things.

```
  {. 1 2 3
1
  {: 1 2 3
3
  ({. 1 2 3) , ({: 1 2 3)
1 3
  +/ ({. 1 2 3) , ({: 1 2 3)
4
```

Let's kick things up by introducing "forks." J will automagically form a fork when we combine certain functions.

```
  ({. 1 2 3) , ({: 1 2 3)
1 3
  ({. , {:) 1 2 3
1 3

```

See that? We were able to extract the `1 2 3` out as a single argument! J interprets the series of verbs `{.`, `,`, and `{:` as a "fork" - it sends our argument to the left and right sides, then takes the results and joins them with `,`. We can do this with all kinds of verbs.

```
  ({: , {.) 1 2 3
3 1
  ({: , {:) 1 2 3
3 3
  (+/ , {:) 1 2 3
6 3
  (+/ * {:) 1 2 3
18
```

Cool, right? This helps us read out our expressions like sentences. For instance, "the sum times the last" can be written as `+/ * {:`, and our argument is automatically passed to both sides as it needs to be.

## Defining verbs

We can use the "is" verb `=:` to define our own verbs.

```
  (+/ , {:) 1 2 3
6 3
  sumlast =: +/ , {:
  sumlast 1 2 3
6 3
  staticthing =: 55   NB. "nouns" too!
  staticthing + 3
58
```

We can also get a little more explicit with our verb definitions. The syntax of which is a little funky, but bear with me.

```
  sumlast =: +/ , {:
  sumlast 1 2 3
6 3
  sumlast =: verb : '(+/ , {:) y'
             NB. 'y' is our argument!
  sumlast 1 2 3
6 3
```

## All together now, Fibonacci

Let's take what we've learned so far and start exploring.

We can make a list.

```
  1 2
1 2
```

We can pick items from our list.

```
  {. 1 2
1
  {: 1 2
2
```

The next [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number) is the sum of the previous two.

```
  +/ 1 2
3
  +/ 2 3
5
```

We need the sum, but we also need to keep the second number around for next time.

```
  ({: 1 2) , (+/ 1 2)
2 3
  ({: 2 3) , (+/ 2 3)
3 5
```

We can extract our argument using a fork to simplify our expression.

```
  ({: , +/) 1 2
2 3
  ({: , +/) 2 3
3 5
```

We can stack our verbs multiple times.


```
  ({: , +/) 1 2
2 3
  ({: , +/) ({: , +/) 1 2
3 5
  ({: , +/) ({: , +/) ({: , +/) 1 2
5 8
```

We can use the power verb `^:` to do this for us.

```
  (({: , +/)^:0) 1 2
1 2
  (({: , +/)^:1) 1 2
2 3
  (({: , +/)^:2) 1 2
3 5
  (({: , +/)^:5) 1 2
13 21
```

We can start at `1 1`.

```
  (({: , +/)^:0) 1 1
1 1
  (({: , +/)^:1) 1 1
1 2
  (({: , +/)^:2) 1 1
3 5
  (({: , +/)^:5) 1 1
8 13
```

We can take just the last number.

```
  {: (({: , +/)^:6) 1 1
21
  {: (({: , +/)^:20) 1 1
17711
```

We can define a Fibonacci function.

```
  fib =: verb : '{: (({: , +/)^:y) 1 1'
  fib 6
21
  fib 20
17711
  fib 50
32951280099
```

## Closing notes

I hope this gentle introduction alleviates some of the pain that comes with looking at an expression like `{: (({: , +/)^:20) 1 1` for the first time. Once you break it down, it's really not so special.

J challenges what it means for code to be "readable." Terse by nature, it uses compact symbols and clever composition tools to let us write code that flows like a conversation.

There's still so much to learn. J has a ton of great tools for representing matrices, polynomials, tables, and much more. If you find posts like these interesting, be sure to [let me know on twitter](https://twitter.com/jdan) so we can learn more together.

Feel free to poke around the [complete J vocabulary](http://www.jsoftware.com/help/dictionary/vocabul.htm) to see what else this great language has to offer. The documentation is just as condensed as the language itself, so proceed with caution (and lots of patience).

Thanks so much for reading!
