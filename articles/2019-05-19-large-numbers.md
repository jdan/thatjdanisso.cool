---
title: Blueprint for Large Numbers
route: /large-numbers
date: 2019-05-19
description: 
---

Consider a modest function "A," which takes a number and adds one to it.

$$
\begin{aligned}
  A(1) &= 2 \\\\
  A(2) &= 3  \\\\
  A(99) &= 100
\end{aligned}
$$

It's not much of an operator, and is easily defeated by its counterpart: "evil A."

$$
\begin{aligned}
  \check A(2) &= 1 \\\\
  \check A(3) &= 2 \\\\
  \check A(100) &= 99
\end{aligned}
$$

We can apply "A" multiple times.

$$
\begin{aligned}
  A(A(1)) = A(2) &= 3 \\\\ 
  A(A(A(A(1)))) &= 5
\end{aligned}
$$

Repeating "A" is a little tiring, so we can use a superscript to make things a little more concise.

$$
\begin{aligned}
  A(A(1)) = A^2(1) &= 3 \\\\
  A(A(A(A(10)))) = A^4(10) &= 14
\end{aligned}
$$

Since this superscript implies "add 1 this many times," the following properties unfold:

$$
\begin{aligned}
A^n(1) &= 1 + n \\\\
A^n(10) &= 10 + n \\\\
A^n(99) &= 99 + n
\end{aligned}
$$

Or, more generally:

$$ A^n(m) = m + n $$

Behold, **addition**!

## Small steps

Our goal is to make large numbers, so we may start throwing some of them at A in hopes of making them even bigger.

$$
\begin{aligned}
A^{1000}(1000) &= 2000 \\\\
A^{1000000}(1000000) &= 2000000
\end{aligned}
$$

But we're not making much progress. For starters, we have to pass in _two_ big numbers - what a waste. Let's not repeat ourselves so much by creating a new function "B":

$$ B(n) = A^n(n) $$

Now we can pass large numbers into B just once - half the work (I checked!)

$$
\begin{aligned}
B(1000) &= A^{1000}(1000) = 2000 \\\\
B(1000000) &= 2000000 \\\\
B(1000000000) &= 2000000000
\end{aligned}
$$

Additionally, the following property holds:

$$ B(n) = A^n(n) = n + n = 2 \cdot n $$

Behold, **multiplication!**

Try as it might, "evil A" can't stop our new friend "B" from taking our numbers to great heights.

$$
\begin{aligned}
\check A(n) &= n - 1 \\\\
B(n) &= 2 \cdot n \\\\
\check A(B(10)) &= 19 \\\\
\check A(B(100)) &= 199 \\\\
\check A(B(5000)) &= 9999 \\\\
\end{aligned}
$$

But "evil B" can, stopping our numbers dead in their tracks.

$$
\begin{aligned}
\check B(n) &= \frac{n}{2} \\\\
B(n) &= 2 \cdot n \\\\
\check B(B(10)) &= 10 \\\\
\check B(B(100)) &= 100 \\\\
\check B(B(5000)) &= 5000 \\\\
\end{aligned}
$$

We'll need something stronger.

## And again

We have a function "B" which _doubles_ a number.

$$
\begin{aligned}
B(1) &= 2 \\\\
B(99) &= 198 \\\\
B(500) &= 1000
\end{aligned}
$$

We can apply "B" multiple times.

$$
\begin{aligned}
B(B(1)) = B(2) &= 4 \\\\
B(B(B(10))) &= 80
\end{aligned}
$$

To shorten things, we can use our trusty friend, the superscript.

$$
\begin{aligned}
B(B(1)) = B^2(1) &= 4 \\\\
B(B(B(10))) = B^3(10) &= 80
\end{aligned}
$$

This pattern may be a bit harder to spot, but we can handle it by expanding things a little.

$$
\begin{aligned}
B^4(5) &= 2 \cdot B^3(5) \\\\
&= 2 \cdot 2 \cdot B^2(5) \\\\
&= 2 \cdot 2 \cdot 2 \cdot B(5) \\\\
&= 2 \cdot 2 \cdot 2 \cdot 2 \cdot 5 \\\\
&= 2^4 \cdot 5
\end{aligned}
$$

The following pattern emerges:

$$ B^n(5) = 2^n \cdot 5 $$

Or, more generally:

$$ B^n(m) = 2^n \cdot m $$

Behold, **exponentiation!**

We can toss some numbers 