---
title: Functions That Go Backwards
route: /functions-that-go-backwards
date: 2020-05-22
description:
hidden: true
---

In most programming languages, we may author a function that takes an **input** and produces some **output**. For example, some code to power a traffic light with JavaScript (please do not use this in production), may look like:

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
console.log(getLightColor("green", "wait")) 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjM2NTE0OTMwXX0=
-->