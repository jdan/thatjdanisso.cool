---
title: Is this true?
route: /is-this-true
date: 2021-03-13
description: "A conversation on unit tests, computation, and existential crises stemming from the question: does this function return true?"
---

You’re writing some code - maybe building out some new features - and it’s time to test your work. For some reason, you named your function `fn` and, for some reason, you want the result to be `true`.

```js
describe("our function", () => {
  it("returns true", () => {
    expect(fn()).toBe(true)
  })
})
```

A pretty reasonable scenario, right? Let's make it unreasonable. Pretend _you're_ the unit test, and instead of the `describe` and `it` above, I'll give you a function and you'll tell me if it returns `true` when it's called.

Is this true?

```js
function fn() {
  return true
}
```

> Of course it is, it’s right there. `true` is true.

So far so good. Is this true?

```
function fn() {
  return true || false
}
```

> Yes, I know that `||` is the logical or operator and true OR false is true.

Right on. Is this true?

```js
function fn() {
  if (5 > 3) {
    return true
  }
}
```

> Yes. I know how to count, and I know that 5 is greater than 3, so I know that `fn()` is true.

So if-statements are fair game then. Is this true?

```js
function fn() {
  if (9 > 10) {
    return true
  } else {
    return false
  }
}
```

> No, 9 is not greater than 10, so this will be `false` and `false` is not `true`.

Correct. Is this true?

```js
function fn() {
  if (9 > 10) {
    return true
  }
}
```

> That’s pretty much the same code. There is no else, so we’ll get to the end and return `undefined` - which is not `true`.

Correct again. A lot of things aren’t true.

Let’s trying something a little different - is this true?

```js
function fn() {
  for (let i = 0; i < 10; i++) {
    if (i > 8) {
      return true
    }
  }
}
```

> Yes, when `i` becomes 9, the result becomes `true`.

Excellent observation. Is this true?

```js
function fn() {
  for (let i = 0; i > -1; i++) {
    // Do nothing
  }
  return true
}
```

> That for loop doesn’t do anything, so this must be true.

Will the for loop ever stop looping?

> ...no. I guess not: `i` will always be `> -1`, forever and ever.

So when will the result become true?

> Never. So this is not true.

Can you say that with certainty? You're the unit test here.

> I can say with certainty that `fn()` is not true.

I love it. Is this true?

```js
function fn() {
  for (let i = 0; i < 10000000000000; i++) {}
  return true
}
```

> Eventually. It will take quite a bit I think, but it will be true.

A long time indeed. The compiler may be able to help, but even without optimizations this is true. Your counting skills are excellent, how about your arithmetic? Is this true?

```js
function fn() {
  for (let i = 1; i % 2 == 1; i += 2) {}
  return true
}
```

> Hey I recognize `%`, that’s the modulo operator. We’ll loop as long as `i` is odd (that is, when divided by two the remainder is one), so this will stop when `i` is even. This must be true.

How do we update `i` on each iteration?

> On second thought, we start it at 1 and add 2 to it each time. 1, 3, 5, 7, etc. All odds. The return value will never become true, so this is not true.

Correct! Your arithmetic skills are sharp.

> Am I destined to parse loops in my head forever?

Yes. Let’s continue. Is this true?

```js
function fn() {
  let bigNumber = 1000000000000000000000000
  for (let count = 1; count < bigNumber; count++) {
    let n = count
    while (n > 1) {
      if (n % 2 == 0) {
        n = n / 2
      } else {
        n = 3 * n + 1
      }
    }
  }

  return true
}
```

> I think `bigNumber` is too big for JavaScript.

Yeah, probably, but for our purposes it's just a "big enough" finite number we can count up to, so I'll allow it.

> Well of course you'll allow it - you make the rules here. Okay but what's all the math inside the while loop?

That's the [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture) (some call it the 3n+1 problem). If `n` is odd we make it `3n+1`, if `n` is even we make it `n/2`. We stop when `n` equals 1.

For some numbers, this ends pretty quickly (8 → 4 → 2 → 1) and for others, it goes for a bit longer (7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1).

> Got it. So we count up to `bigNumber` and do a bunch of pointless math on each iteration. We `return true` at the end so this must be true.

Do we reach the end?

> You said "we stop when `n` equals 1."

Does `n` always reach 1 at some point?

> Well I ran it for `bigNumber` set to 100000 and it took a bit, but it got there. I'm not entirely su-- wait why is it called a "conjecture"?

A [conjecture](https://en.wikipedia.org/wiki/Conjecture) is a proposition "which is suspected to be true due to preliminary supporting evidence, but for which no proof or disproof has yet been found."

> Oh so `n` doesn't always get to 1. This must not be true then.

[We don't _know_ if `n` always gets to 1](https://en.wikipedia.org/wiki/Collatz_conjecture#Statement_of_the_problem). We also don't know if `n` does not always get to 1.

> Okay so I'm not sure if `fn()` is true, but I'm also not sure if `fn()` is not true.

You're the unit test. Does it pass?

> I don't... I don't know. Do I? What am I? Can I exist?

What do you require to make a decision?

> I guess I need to be able to solve the Collatz conjecture to decide.

Okay, we can table this one for now, and I'll ask you again once the Collatz conjecture has been solved.

> Thank heavens.

Is this true?

> Can I please have a break? I'm beginning to question whether or not I can exist.

Let's **assume you exist**.

> Okay, that makes me feel better, thank you.

Is this true?

```js
function fn() {
  for (let n = 3; ; n += 2) {
    let sumOfFactors = 0
    for (let i = 1; i < n; i++) {
      if (n % i === 0) {
        sumOfFactors += i
      }
    }

    if (sumOfFactors === n) {
      return true
    }
  }
}
```

> Oh goodness what do we have here. It looks like we're summing up factors (numbers less than n that divide into n)... but only for the odd numbers? And we want to check if the sum of those factors is the original number.

That's correct.

> I believe these are called [Perfect numbers](https://en.wikipedia.org/wiki/Perfect_number). But I don't understand why we start at 3 and increment by 2.

We're only interested in finding an odd perfect number, [if there is one](https://en.wikipedia.org/wiki/Perfect_number#Odd_perfect_numbers).

> You're losing me. Look, I'm not interested in solving your silly math problems. You said I exist, so while I don't know if this function is true or not, I know I can figure it out and give you a yes or no answer.

That is a perfectly acceptable response.

> It is?

**You exist**. I can depend on you to tell me "yes" or "no" when I ask if a function returns true. From now on I will call you `returnsTrue`.

> I like the sound of that.

I promise to only use your powers for good.

> What?

```js
function halts(program) {
  let fn = () => {
    eval(program)
    return true
  }

  return returnsTrue(fn)
}
```

> Wait, you can't write `halts`. This is the [Halting problem](https://en.wikipedia.org/wiki/Halting_problem) and the Halting problem cannot be solved<sup><a id="halting-footnote-src" href="#halting-footnote">1</a></sup>.

I just did.

> It won't work. Nice try.

Of course it will. I give you a function and we determined you can always tell me if that function returns true or not.

> What if the program loops forever?

Then you know the function will not return true. Many of our programs above looped forever. You can do anything.

> But... you can't determine if an arbitrary program will halt.

I just did. Thank you.

> That's not possible. You can't just _do that_.

> Hello?

> Are you still there?

> Do you have more problems for me?

> Hello?

---

This article is a retelling of [Tom Stuart's "Impossible Programs" talk](https://www.youtube.com/watch?v=hN63FOa_Gp4) from 2015. It was very much a mind-blown moment for me and I've been thinking about it ever since. Tom's also written a book called [Understanding Computation](https://computationbook.com/) which you should check out.

Thanks for reading.

---

<p class="footnote">
  <sup><a id="halting-footnote" href="#halting-footnote-src">1</a></sup> Wikipedia gives a <a href="https://en.wikipedia.org/wiki/Halting_problem#Proof_concept">nice, 1000-foot proof by contradiction</a> to this problem. Imagine <code>halts(f)</code> exists and returns true or false for all functions. We could then use it to write a function such as:
</p>

```js
function f() {
  if (halts(f)) {
    while (true) {
      // Do nothing
    }
  }
}
```

Does `f()` halt? If it does, then `halts(f)` is true so we enter an infinite loop (which does not halt). If `f` does _not_ halt, then we skip the loop and return immediately in which case it _does_ halt. We've worked ourselves into a contradiction, and the only way out is if `halts(f)` does not exist as in our assumption.
