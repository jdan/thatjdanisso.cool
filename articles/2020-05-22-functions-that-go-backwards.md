---
title: Functions That Go Backwards
route: /functions-that-go-backwards
date: 2020-05-22
description: A gentle introduction to logic programming with Prolog, exploring how to define programs in terms of relations instead of input and output.
hidden: true
---

In most programming languages, we may author a function that takes an **input** and produces some **output**. 

```js
console.log(getTrafficLightColor("green", "wait"))
// => "yellow"
```

We can say that our code answers the following question: *Given a light color and an action, what happens to the color of the light?*

And it answers it well! We can test its behavior, give it some types, whatever we want - to get a solid answer. We can compose these questions to ask more interesting ones:

*If I wait twice at a green light, what will the color of the light be?*

```js
console.log(
	getTrafficLightColor(
		getTrafficLightColor("green", "wait"),
		"wait"
	)
) // => "red"
```

But if I asked another question: *What color should the light be such that if I wait, it will turn red?*

We're no longer asking a question in terms of its **input** (which is easy!), but its **output** (which makes us scratch our heads).

## Logically speaking

We'll use a fun "logic programming" language called [Prolog]([https://en.wikipedia.org/wiki/Prolog](https://en.wikipedia.org/wiki/Prolog)) (you can grab [SWI-Prolog]([https://www.swi-prolog.org/](https://www.swi-prolog.org/)) for free) to explore this concept.

Instead of writing a function in terms of its inputs, we write _relationships_ between input and output. An example of such a relation is **a valid transition for our traffic light turns `green` with a `wait` action into `yellow`**.

All we care about are the `green`, `wait`, and `yellow` (these are known as "atoms" in Prolog), and we can use them to build a "**fact**".

```prolog
transition(green, wait, yellow).
```

We can choose whatever order we want as long as we're consistent. We'll go with the one above since it matches the prose we translated into Prolog.

Let's write a few more of these in a file called `fsm.prolog`.

```prolog
% fsm.prolog
transition(green, wait, yellow).
transition(yellow, wait, red).
transition(red, wait, green).
```

We can then load up `swipl` in our terminal and test it out. After we load our facts with `[fsm].` we can begin "querying" them. 

```prolog
?- [fsm]. 	% load fsm.prolog
?- transition(green, wait, yellow).
true.
?- transition(red, wait, yellow).
false.
```

Our first query `transition(green, wait, yellow).` is a fact, because we defined it as such on the first line of `fsm.prolog`. Prolog tells us "true" - the thing we asked is `true`.

The second query, `transition(red, wait, yellow)` does not appear in our database, so it is `false`.

Of course, Prolog can do much more than recall facts that we already entered! The magic happens when we query with variables.

```prolog
?- transition(green, wait, Color).
Color = yellow.
```

By using a variable (we just need to begin a word with an uppercase letter), we're now asking Prolog to "fill in the blank for us". Which `Color` does `transition(green, wait, Color)` result in a fact? yellow!

Better yet, we can put this variable **wherever we want**. Our original question: *What color should the light be such that if I wait, it will turn red?* can be queried like so.

```prolog
?- transition(X, wait, red).
X = yellow.
```

Because transition does not work on input and output, we can swap 'em as we please.

```prolog
?- transition(X, wait, purple).
false.
```

Rather unfortunately, the traffic light we invented can never turn purple.

How about representing *multiple* transitions? We can join queries with a comma to ask that Prolog fills in the blanks to satisfy both. Let's start at `green` and `wait` twice.

```prolog
?- transition(green, wait, State1), 
|    transition(State1, wait, Final).
State1 = yellow,
Final = red.
```

We left two blanks, `State1` and `Final`, and Prolog filled em both to find that **waiting twice at a green light results in a red light**. Of course this works backwards for free.



## Improving Relations
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTM4NjA1ODIzMiwtMTU4Njk3MDY4NywxOD
I4NzEwMzY0LC05NzMwNTY1NzRdfQ==
-->