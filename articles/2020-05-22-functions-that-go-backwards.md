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

We can say that our code answers the following question: **Given a light color and an action, what happens to the color of the light?**

And it answers it well! We can test its behavior, give it some types, whatever we want - to get a solid answer. We can compose these questions to ask more interesting ones:

**If I wait twice at a green light, what will the color of the light be?**

```js
console.log(
	getTrafficLightColor(
		getTrafficLightColor("green", "wait"),
		"wait"
	)
) // => "red"
```

But if I asked another question: **What color should the light be such that if I wait, it will turn red?**

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

By using a variable (we just need to begin a word with an uppercase letter), we're now asking Prolog to fill in the blank for us through a process called "**unification**." Which `Color` does `transition(green, wait, Color)` result in a fact? `yellow`!

Better yet, we can put this variable **wherever we want**. Our original question: **What color should the light be such that if I wait, it will turn red?** can be queried like so.

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

```prolog
?- transition(Start, wait, State1),
|    transition(State1, wait, yellow).
Start = red,
State1 = green.
```

Want to wait twice for a yellow? You'll start at red.

## Improving relations

Just as we can define functions and compose them in ordinary programming languages, we can build "**rules**" out of facts and variables. For example, if we wanted an easier way to query for "waiting twice":

```prolog
% fsm.prolog
wait_twice(Start, End) :-
	transition(Start, wait, Middle),
	transition(Middle, wait, End).
```

We've defined `wait_twice` such that we'll `transition` once from `Start` to `Middle`, then `Middle` to `End`. We can use it like so:

```prolog
?- [fsm].
?- wait_twice(green, red).
true.
?- wait_twice(green, yellow).
false.
```

Waiting twice at a green does in fact give us a red light, while it is _not true_ that waiting twice at a green light gives us a yellow light. Similar to before, we can query with variables:

```prolog
?- wait_twice(green, X).
X = red.
?- wait_twice(X, yellow).
X = red.
?- wait_twice(X, purple).
false.
```

Let's dive into something a little more complicated, but much more rewarding. How about a rule that relates a start and end light color with a **list** of actions?

We'll call this rule `transition_multi` and define it recursively - starting with an empty list. If we have an initial `State` and an empty list of actions `[]`, what should our final state be? Right where we started.

```prolog
% fsm.prolog
transition_multi(State, [], State).
```

For the recursive step it may help to see how Prolog's "unification" works with lists.

```prolog
?- A = [1, 2, 3, 4].
A = [1, 2, 3, 4].
?- [A, B, C] = [1, 2, 3].
A = 1,
B = 2,
C = 3.
?- [A, B] = [1, 2, 3].
false.
```

We can set a list to a variable, or pattern-match on `[Var1, Var2, Etc...]` if the lengths are the same.

If we want to match the "rest" of the list, we can use the `|` operator.

```prolog
?- [A | Rest] = [1, 2, 3, 4].
A = 1,
Rest = [2, 3, 4].
?- [A, B | Rest] = [1, 2].
A = 1,
B = 2,
Rest = [].
```

So, back to `transition_multi`. Our definition looks pretty similar to `wait_twice`.

```prolog
% fsm.prolog
transition_multi(State, [], State).
transition_multi(State, [Action | Rest], End) :-
	transition(State, Action, Middle),
	transition_multi(Middle, Rest, End).
```

We unify the list of actions into `Action` and `Rest`, then transition from `State` to `Middle` before recursively `transition_multi`'ing from `Middle` to `End`.

Let's try it out.

```prolog
?- [fsm].
?- transition_multi(green, [wait, wait], red).
true
```

Groovy, so Prolog can confirm that `wait`ing twice at a green light gets us a red light. We can put a few variables in to flex a bit.

```prolog
?- transition_multi(yellow, [wait, wait, wait], X).
X = yellow
?- transition_multi(X, [wait, wait, wait, wait], yellow).
X = green .
```

## Many answers

How about the array in the middle? We can make that a variable too.

```prolog
?- transition_multi(green, Actions, red).
Actions = [wait, wait] <cursor>
```

Prolog tells us that `[wait, wait]` will work, then - interestingly - waits for input. We can hit `Enter` to get back to the original prompt, or hit semicolon `;` to **keep it going**.

```prolog
?- transition_multi(green, Actions, red).
Actions = [wait, wait] ;
Actions = [wait, wait, wait, wait, wait] <cursor>
```

It appears that not only do two `wait`s bring us from green to red, but so do five. This is because waiting three times brings us back to green (then two more for red). We can keep going with another press of `;`.

```
?- transition_multi(green, Actions, red).
Actions = [wait, wait] ;
Actions = [wait, wait, wait, wait, wait] ;
Actions = [wait, wait, wait, wait, wait, wait, wait, wait] ;
Actions = [wait, wait, wait, wait, wait, wait, wait, wait, wait|...] .
```

We'll be here forever (and ever) so we can just hit `.` to stop.

## What are you waiting for?

Up until now we've been dealing with a single action `wait`, which moves the traffic light from one color to another. Let's introduce two more.

```
% fsm.prolog
transition(green, wait, yellow).
transition(yellow, wait, red).
transition(red, wait, green).

transition(green, power_outage, blinking).
transition(yellow, power_outage, blinking).
transition(red, power_outage, blinking).

transition(blinking, power_on, red).
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkzNzMxNTI0MSwtNzExMTMyMjg1LC0xMD
M0OTkxMDMwLDEzNjUzMjQ5NywtMTU4Njk3MDY4NywxODI4NzEw
MzY0LC05NzMwNTY1NzRdfQ==
-->