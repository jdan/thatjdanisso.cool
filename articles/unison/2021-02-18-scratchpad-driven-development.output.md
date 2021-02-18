We'll start by creating a type representing a [Binary Tree](https://en.wikipedia.org/wiki/Binary_tree) that stores values of type `a`.

To fit a CS 101 lecture into two sentences: a binary tree is either a `Leaf` (sometimes this leaf has a value but it doesn't need to because memory is cheap now) or a `Node` consisting of _three_ things: a value (of type `a`, so this could be a number, a string, a... anything really), a _left_ tree, and a _right_ tree. The "left" and "right" parts make our tree a "binary" tree because there are two of them.

Anyway, in unison this type is represented as follows. We'll enter this into `scratch.u` and save.

```unison
type BinaryTree a =
    Leaf
  | Node a BinaryTree BinaryTree
```

```ucm

  I found and typechecked these definitions in scratch.u. If you
  do an `add` or `update`, here's how your codebase would
  change:
  
    ⍟ These new definitions are ok to `add`:
    
      type BinaryTree a

```
`ucm` now informs us that are definitions "ok to `add`". Let's do that.

```ucm
.> add

  ⍟ I've added these definitions:
  
    type BinaryTree a

```
Now we can view the definition of our type by entering the following into `ucm`:

```ucm
.> view BinaryTree

  type BinaryTree a = Node a BinaryTree BinaryTree | Leaf

```
...Okay, but our definition is right there in `scratch.u`. So this is not super useful to us, right? Well, let's go ahead and empty `scratch.u` and save.

```unison
-- This is a comment, but pretend it's not here and the file is empty!
```

```ucm

  I loaded scratch.u and didn't find anything.

```
