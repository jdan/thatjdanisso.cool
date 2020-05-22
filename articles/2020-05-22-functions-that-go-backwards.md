---
title: Functions That Go Backwards
route: /functions-that-go-backwards
date: 2020-05-22
description:
hidden: true
---

In most programming languages, we may author a function that takes an **input** and produces some **output**. For example, in JavaScript:

```js
function getLightColor(color, action) {
  if (color === "green" && action === "wait") {
    return "yellow"
  } else if (color === "yellow" && action === "wait") {
    return "red"
  } else if (color === "red" && action === "wait") {
	return "green"

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwMDIwMzQxMjFdfQ==
-->