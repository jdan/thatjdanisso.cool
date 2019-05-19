---
title: A Blueprint for Large Numbers
route: /large-numbers
date: 2019-05-19
description: Let's generate numbers that can't fit in the observable universe.
---

Consider a modest function "A," which takes a number and adds one to it.

$$
\begin{aligned}
  A(1) &= 2 \\
  A(2) &= 3  \\
  A(99) &= 100
\end{aligned}
$$

It's not much of an operator, and is easily defeated by its counterpart: "evil A."

$$
\begin{aligned}
  \check A(2) &= 1 \\
  \check A(3) &= 2 \\
  \check A(100) &= 99
\end{aligned}
$$

We can apply "A" multiple times.

$$
\begin{aligned}
  A(A(1)) = A(2) &= 3 \\
  A(A(A(A(1)))) &= 5
\end{aligned}
$$

Repeating "A" is a little tiring, so we can use a superscript to make things a little more concise.

$$
\begin{alignedat}{2}
  A(A(1)) &= A^2(1) &&= 3 \\
  A(A(A(A(10)))) &= A^4(10) &&= 14
\end{alignedat}
$$

Since the superscript implies "add 1 this many times," the following properties unfold:

$$
\begin{aligned}
A^n(1) &= 1 + n \\
A^n(10) &= 10 + n \\
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
A^{1000}(1000) &= 2000 \\
A^{1000000}(1000000) &= 2000000
\end{aligned}
$$

But we're not making much progress. For starters, we have to pass in _two_ big numbers - what a waste. Let's not repeat ourselves so much by creating a new function "B":

$$ B(n) = A^n(n) $$

Now we can pass large numbers into B just once - half the work (I checked!).

$$
\begin{aligned}
B(1000) &= A^{1000}(1000) \\
&= 1000 + 1000 \\
&= 2000 \\
B(1000000) &= 2000000 \\
B(1000000000) &= 2000000000
\end{aligned}
$$

We can see that the following property holds:

$$ B(n) = A^n(n) = n + n = 2 \cdot n $$

Behold, **multiplication!**

Try as it might, "evil A" can't stop our new friend "B" from taking our numbers to great heights.

$$
\begin{aligned}
\check A(n) &= n - 1 \\
B(n) &= 2 \cdot n \\
\check A(B(10)) &= 20 - 1 = 19 \\
\check A(B(100)) &= 199 \\
\check A(B(5000)) &= 9999 \\
\end{aligned}
$$

But "evil B" can, stopping our numbers dead in their tracks.

$$
\begin{aligned}
\check B(n) &= \frac{n}{2} \\
B(n) &= 2 \cdot n \\
\check B(B(10)) &= \frac{20}{2} = 10 \\
\check B(B(100)) &= 100 \\
\check B(B(5000)) &= 5000 \\
\end{aligned}
$$

We'll need something stronger.

## Slightly bigger steps

We have a function "B" which _doubles_ a number.

$$
\begin{aligned}
B(1) &= 2 \\
B(99) &= 198 \\
B(500) &= 1000
\end{aligned}
$$

We can apply "B" multiple times.

$$
\begin{aligned}
B(B(1)) = B(2) &= 4 \\
B(B(B(10))) &= 80
\end{aligned}
$$

To shorten things, we can use our trusty friend, the superscript.

$$
\begin{alignedat}{2}
B(B(1)) &= B^2(1) &&= 4 \\
B(B(B(10))) &= B^3(10) &&= 80
\end{alignedat}
$$

This pattern may be a bit harder to spot, but we can handle it by expanding things a little.

$$
\begin{aligned}
B^4(5) &= 2 \cdot B^3(5) \\
&= 2 \cdot 2 \cdot B^2(5) \\
&= 2 \cdot 2 \cdot 2 \cdot B(5) \\
&= 2 \cdot 2 \cdot 2 \cdot 2 \cdot 5 \\
&= 2^4 \cdot 5
\end{aligned}
$$

The following pattern emerges:

$$ B^n(5) = 2^n \cdot 5 $$

Or, more generally:

$$ B^n(m) = 2^n \cdot m $$

Behold, **exponentiation!**

Just as before, we'll consolidate m and n by introducing a new function "C."

$$ C(n) = B^n(n) = 2^n \cdot n $$

## Getting there

Our numbers are starting to grow pretty quickly:

$$
\begin{alignedat}{2}
C(3) &= 2^3 \cdot 3 &&= 24 \\
C(10) &= 2^{10} \cdot 10 &&= 10240 \\
C(100) &= 2^{100} \cdot 100 &&= 12676506\mathellipsis
\end{alignedat}
$$

Passing 100 to our friend "C" produces `126765060022822940149670320537600`, which is a whopping 33 digits in length. Switch the 100 to 1000 and we get:

<pre><code>107150860718626732094842504906000
181056140481170553360744375038837
035105112493612249319837881569585
812759467291755314682518714528569
231404359845775746985748039345677
748242309854210746050623711418779
541821530464749835819412673987675
591655439460770629145711964776865
421676604298316526243868372056680
69376000
</code></pre>

Coming in at 305 digits. Pretty huge - larger than [the number of particles in the universe](https://en.wikipedia.org/wiki/Elementary_particle#Common_elementary_particles) - but still easily represented here in this article.

Additionally, our "evil B" from earlier is no match for us now.

$$
\begin{aligned}
\check B(n) &= \frac{n}{2} \\
C(n) &= 2^n \cdot n \\
\check B(C(10)) &= 5120 \\
\check B(C(100)) &= 633825\mathellipsis \text{(32 digits)} \\
\check B(C(1000)) &= 535754\mathellipsis \text{(304 digits)}\\
\end{aligned}
$$

Try as it might, "evil B" can only occasionally knock a single digit off our numbers.

A new challenger approaches, however, that can take them out using its secret weapon - [the logarithm](https://www.khanacademy.org/math/algebra2/exponential-and-logarithmic-functions/introduction-to-logarithms/a/intro-to-logarithms).

$$
\begin{aligned}
\check C(n) &= \lg(n) \\
C(n) &= 2^n \cdot n \\
\check C(C(10)) &= 13.321\mathellipsis \\
\check C(C(100)) &= 106.643\mathellipsis \\
\check C(C(1000)) &= 1009.965\mathellipsis  \\
\end{aligned}
$$

Our numbers are _barely_ able to escape the mighty logarithm. We'll need something stronger.

## To new heights

We have a function "C" which raises 2 to the power "n" and multiplies it by "n"

$$
\begin{alignedat}{2}
C(n) &= 2^n \cdot n \\
C(3) &= 2^3 \cdot 3 &&= 24 \\
C(10) &= 2^{10} \cdot 10 &&= 10240 \\
\end{alignedat}
$$

This function has a little sibling which does the same thing, but does not multiply by "n". It won't produce numbers quite as big, but will be a little easier for us to work with.

$$
\begin{aligned}
\dot C(n) &= 2^n \\
\dot C(3) &= 8 \\
\dot C(10) &= 1024
\end{aligned}
$$

We can apply "little C" multiple times.

$$
\begin{alignedat}{2}
\dot C(n) &= 2^n \\
\dot C(\dot C(n)) &= 2^{\dot C(n)} &&= 2^{2^n} \\
\dot C(\dot C(\dot C(n))) &= 2^{\dot C(\dot C(n))} \\
&= 2^{2^{\dot C(n)}} &&= 2^{2^{2^{n}}}
\end{alignedat}
$$

Just as before, we can use our trusty friend the superscript.

$$\dot C^5(n) = 2^{2^{2^{2^{2^n}}}}$$

Repeated applications of "little C" result in these fairly alien "towers" of 2s. In particular:

$$\dot C^m(n) = \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2^n}}}}}}}_{\text{m copies of 2}}$$

Once again we can consolidate m and n:

$$D(n) = \dot C^n(n) = \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2^n}}}}}}}_{\text{n copies of 2}}$$

Just as we removed the trailing end for "C", we'll remove the trailing n for "D" to simplify things.

$$
\begin{aligned}
C(n) &= 2^n \cdot n \\
\dot C(n) &= 2^n \\
D(n) &= \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2^n}}}}}}}_{\text{n copies of 2}} \\
\dot D(n) &= \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{\text{n copies of 2}}
\end{aligned}
$$

These "towers of exponents" are referred to as "[tetrations](https://en.wikipedia.org/wiki/Tetration)" and are typically represented using [Knuth's up-arrow notation](https://en.wikipedia.org/wiki/Knuth%27s_up-arrow_notation).

$$
\dot D(5) = 2^{2^{2^{2^2}}} = 2 \uparrow \uparrow 5
$$

They're bizarre-looking, and grow...**really quickly**. How quickly?

$$
\begin{alignedat}{2}
\dot D(2) &= 2^2 &&= 4 \\
\dot D(3) &= 2^{2^2} &&= 16 \\
\dot D(4) &= 2^{2^{2^2}} &&= 65536 \\
\dot D(5) &= 2^{2^{2^{2^2}}} &&= 2^{65536}
\end{alignedat}
$$

At just 5 items in, we're produced a number that is 19,729 digits in length. Much larger than anything we've seen so far, but still _tangible_. In fact, I can print this number at size 11 font with 1" margins in just 7 sheets of paper (about 3,000 digits per page).

![a print preview showing the very long number (20035299...) with "Total: 7 pages"](/img/digits.png)

Why stop there?

$$\dot D(6) = 2^{2^{2^{2^{2^2}}}} = \text{???}$$

What _is_ this number? Concretely, it's 2 raised to the giant number we just saw. How much larger does that make it?

While we could print `D(5)` on 7 pages of paper, we'll need 7 pages of paper **just to print the number of digits in `D(6)`**. What if we wanted to print `D(6)` itself? We'll need about `D(5)` pages.

More specifically, we'll need `D(5) / 3,000` pages, but `D(5)` is so massive the `/ 3,000` does absolutely nothing to it.

How about `D(7)`? We'll need `D(5) / 3,000` pages to print its digits, and `D(6) / 3,000` pages to print the number itself. There's a pattern here, but not one that translates well into physical sheets of paper. Simply put, the number's big.

In fact, our function generates numbers so big that "evil C" is quickly drowned by them.

$$
\begin{alignedat}{2}
\check C(n) &= \lg(n) \\
\check C(\dot D(2)) &= \lg{(2^2)} &&= 2 \\
\check C(\dot D(3)) &= \lg{(2^{2^2})} &&= 2^2 \\
\check C(\dot D(4)) &= \lg{(2^{2^{2^2}})} &&= 2^{2^2} \\
\check C(\dot D(5)) &= \lg{(2^{2^{2^{2^2}}})} &&= 2^{2^{2^2}} \\
\check C(\dot D(6)) &= \lg{(2^{2^{2^{2^{2^2}}}})} &&= 2^{2^{2^{2^2}}}
\end{alignedat}
$$

Try as it might, "evil C" can only knock off a single item from our ever-growing tower of exponents.

A tower of exponents is a real force to be reckoned with.

## But not big enough

We have a function "D" which generates a tower of 2s with a height of "n."

$$
\dot D(n) = \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{\text{n copies of 2}}
$$

We can apply this function to itself.

$$
\begin{aligned}
\dot D(\dot D(n)) &= \dot D(\underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{\text{n copies of 2}}) \\
&= \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{(\underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{\text{n copies of 2}})\text{ copies of 2}}
\end{aligned}
$$

In the previous section, we saw how `D(n-1)` dictated the **number of digits** for `D(n)`. Well, `D(D(n))` grows not on the level of _exponents_, but on the level of the _number of exponents in the tower_.

**While `D(6)` was practically impossible to image, `D(D(6))` is pure nightmare fuel. Let's continue.**

Just as earlier, we can use a superscript to simplify things:

$$
\left.
\dot D^m(n) = \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{(\underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{(\cdot^{\cdot^{\cdot}}) \text{ copies of 2}})\text{ copies of 2}}
\right\} \text{m times}
$$

And we can consolidate m and n like so:

$$
\begin{aligned}
E(n) &= \dot D^n(n) \\
&= \left.
        \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{(\underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{(\cdot^{\cdot^{\cdot}}) \text{ copies of 2}})\text{ copies of 2}}
    \right\} \text{n times}
\end{aligned}
$$

These towers-of-towers can be hard to read (and harder to write), so we can simplify things a bit using [our previous up-arrow notation](https://en.wikipedia.org/wiki/Knuth%27s_up-arrow_notation).

$$
\begin{aligned}
\dot D(n) &= 2 \uparrow \uparrow n \\
\dot D(\dot D(n)) &= 2 \uparrow \uparrow (2 \uparrow \uparrow n) \\
\dot D(\dot D(\dot D(n))) &= 2 \uparrow \uparrow (2 \uparrow \uparrow (2 \uparrow \uparrow n)) \\
\dot D^m(n) &= \underbrace{\dot D(\dot D( \cdots \dot D(n)))}_{\text{m copies of } \dot D} \\
&= \underbrace{2 \uparrow \uparrow (\cdots (2 \uparrow \uparrow n))}_{\text{m copies of 2}}
\end{aligned}
$$

(and consolidate m and n):

$$
\begin{aligned}
E(n) &= \dot D^n(n) \\
&= \underbrace{2 \uparrow \uparrow (2 \uparrow \uparrow (\cdots (2 \uparrow \uparrow n))}_{\text{n copies of 2}}
\end{aligned}
$$

Lastly, we'll want to get rid of that pesky "n" at the end and create a "little E" just as we did for "C" and "D".

$$
\begin{aligned}
D(n) &= \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2^n}}}}}}}_{\text{n copies of 2}} \\
\dot D(n) &= \underbrace{2^{2^{2^{\cdot^{\cdot^{\cdot^{2}}}}}}}_{\text{n copies of 2}} \\
E(n) &= \underbrace{2 \uparrow \uparrow (2 \uparrow \uparrow (\cdots (2 \uparrow \uparrow n))}_{\text{n copies of 2}} \\
\dot E(n) &= \underbrace{2 \uparrow \uparrow (2 \uparrow \uparrow (\cdots (2 \uparrow \uparrow 2))}_{\text{n copies of 2}}
\end{aligned}
$$

Conveniently, mathematicians have an elegant way to represent "apply double-up-arrow n times," and all it takes is adding a third arrow.

$$
\begin{aligned}
\dot E(n) &= \underbrace{2 \uparrow \uparrow (2 \uparrow \uparrow (\cdots (2 \uparrow \uparrow 2))}_{\text{n copies of 2}} \\
\dot E(n) &= 2 \uparrow \uparrow \uparrow n
\end{aligned}
$$

## Arrows, arrows, arrows

In fact, if we repeat the process we used to generate "B" through "E":

$$
\begin{aligned}
E^m(n) &= \underbrace{E(E(\cdots(E(n))}_{\text{m times}} \\
E^n(n) &= \underbrace{E(E(\cdots(E(n))}_{\text{n times}} \\
F(n) &= E^n(n) \\
G(n) &= F^n(n) \\
H(n) &= G^n(n) \\
\dots
\end{aligned}
$$

All we're really doing is **adding more arrows**.

$$
\begin{aligned}
E(n) &= 2 \uparrow \uparrow \uparrow n \\
F(n) &= 2 \uparrow \uparrow \uparrow \uparrow n \\
G(n) &= 2 \uparrow \uparrow \uparrow \uparrow \uparrow n \\
H(n) &= 2 \uparrow \uparrow \uparrow \uparrow \uparrow \uparrow n \\
\dots
\end{aligned}
$$

Eventually the arrows themselves will become unweildy:

$$
Z(n) = \underbrace{2 \uparrow \uparrow \cdots \uparrow n}_\text{25 arrows}
$$

Worry not, for we can provide a superscript _to the arrow_ itself. (Keep in mind that our numbers became _incomprehensibly_ large 23 arrows ago.)

$$
\begin{aligned}
Z(n) &= \underbrace{2 \uparrow \uparrow \cdots \uparrow n}_\text{25 arrows} \\
Z(n) &= 2 \uparrow^{25} n
\end{aligned}
$$

So, what if we wanted to continue growing the number of arrows?

<div style="padding: 8px; background: #e0e0e0; color: red">[Existential Error] Shutting down...
</div>

I'll leave that to you, dear reader, for I am exhausted.

Thanks for reading :) If you enjoyed this article, you'll probably love [Graham's Number](https://www.youtube.com/watch?v=GuigptwlVHo) and [TREE(3)](https://www.youtube.com/watch?v=3P6DWAwwViU).
