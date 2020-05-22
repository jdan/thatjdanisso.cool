---
title: Functions That Go Backwards
route: /functions-that-go-backwards
date: 2020-05-22
description:
hidden: true
---

In most programming languages, we may author a function that takes an **input** and produces some **output**. For example, some code to power a traffic light with JavaScript (please do not use this in production) may look like:

```js
function getLightColor(color, action) {
  if (color === "green" && action === "wait") {
    return "yellow"
  } else if (color === "yellow" && action === "wait") {
    return "red"
  } else if (color === "red" && action === "wait") {
	return "green"
  }
}
```

Nothing out of the ordinary here! We can pass it some input, and get a new color.

```js
console.log(getLightColor("green", "wait"))   // => "yellow"
console.log(getLightColor("yellow", "wait"))  // => "red"
console.log(getLightColor("red", "wait"))     // => "green"
```

This code answers the following question:

> Given a light color and an action, what happens to the color of the light?

We may choose to author our method 
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTYzNTU2Mzk5XX0=
-->