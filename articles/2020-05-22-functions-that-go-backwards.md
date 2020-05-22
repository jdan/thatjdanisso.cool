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

## Programming with Relations

We'll use a fun language called [Prolog]([https://en.wikipedia.org/wiki/Prolog](https://en.wikipedia.org/wiki/Prolog)) (you can grab [SWI-Prolog]
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjU5MjkwNzQxLC0xNTg2OTcwNjg3LDE4Mj
g3MTAzNjQsLTk3MzA1NjU3NF19
-->