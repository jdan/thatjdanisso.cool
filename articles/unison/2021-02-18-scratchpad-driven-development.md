---
title: Scratchpad-Driven Development with Unison
route: /scratchpad-driven-development
date: 2021-02-18
description: todo
---

INTRO TODO

We'll start by creating a type representing a [Binary Tree](https://en.wikipedia.org/wiki/Binary_tree) that stores values of type `a`.

To fit a CS 101 lecture into two sentences: a binary tree is either a `Leaf` (sometimes this leaf has a value but it doesn't need to because memory is cheap now) or a `Node` consisting of _three_ things: a value (of type `a`, so this could be a number, a string, a... anything really), a _left_ tree, and a _right_ tree. The "left" and "right" parts make our tree a "binary" tree because there are two of them.

Anyway, in unison this type is represented as follows. We'll enter this into `scratch.u` and save.

```unison
type BinaryTree a =
    Leaf
  | Node a (BinaryTree a) (BinaryTree a)
```

`ucm` now informs us that are definitions "ok to `add`". Let's do that.

```ucm
.> add
```

Now we can view the definition of our type by entering the following into `ucm`:

```ucm
.> view BinaryTree
```

...Okay, but our definition is right there in `scratch.u`. So this is not super useful to us, right? Well, to illustrate let's empty out `scratch.u` (No need to commit or anything, just delete it all!)

```unison
-- This space intentionally left blank
```

`ucm` didn't find anything, but if we ask it for `BinaryTree` again...

```ucm
.> view BinaryTree
```

Ta-da! Our "code" from earlier is safe and sound.

When we entered `add` in ucm before, we were instructing it to save our definitions. Not in the file we were editing, but _in the codebase itself_. In reality this is a big folder full of a bunch of data off in `~/.unison` (or elsewhere if specified manually as I do).

What else is in here besides `BinaryTree`? (What else can we `view`?) To answer that, we'll use the `ls` command in ucm.

```ucm
.> ls
```

We see a few things!

`BinaryTree` is the type we've been peeking at for a bit, `BinaryTree/` is a _folder with more definitions inside of it_, and `base/` is the [base library for the Unison language](https://github.com/unisonweb/base) (sort of like a standard library with a bunch of utility functions and datatypes). We can investigate `BinaryTree/` with - you guessed it - `ls`.

```ucm
.> ls BinaryTree
```

And we see the two "constructors" for leaves and nodes. Let's try them out! Back in our scratchpad (which is now empty), we'll add the following and save.

```unison
> Leaf
```

The `>` character tells `ucm` that this is an expression we want to "watch" - and evaluate/print when we save the file. We can repeat this for a `Node`.

```unison
> Node 5 Leaf Leaf
```

Nothing too exciting here, except for the fact that we're evaluating code that isn't actually in the file! `scratch.u` contains references to `Node` and `Leaf` which are not defined in the file as they would be for most other languages. Instead they exist in our codebase and we can trivially use them.

Let's continue onward by writing a function for our trees, we'll start with an easy one - counting the number of values in the tree. Since our data structure is recursive, we'll use recursion to count `Leaf`s as 0, and `Node`s as 1 plus the counts of the left and right tree. The syntax here may look a bit foreign to you (or comfortable if you've written an ML dialect before!).

```unison
count = cases
  Leaf -> 0
  Node value left right ->
    1 + (count left) + (count right)
```

Just as before, we can `add` this function to our codebase.

```ucm
.> add
```

And now we can remove the definition of `count` and replace the contents of `scratchpad.u` with a single watch.

```unison
> count
  (Node 5
        (Node 3
              Leaf
              (Node 1 Leaf Leaf))
        Leaf)
```
