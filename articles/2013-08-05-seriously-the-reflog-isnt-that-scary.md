---
title: Seriously, The Reflog Isn't That Scary
date: 2013-08-05
route: /seriously-the-reflog-isnt-that-scary
color: green
description: demystifying git-reflog
hidden: true
---

I know, I know - changing history can be scary. Rebasing, squashing, and loads of force pushing can worry any junior engineer such as myself, but it really shouldn't. Truth is, these are powerful tools that you should have on your toolbelt and, contrary to what you may believe, it's very difficult to actually mess things up.

This guide exhibits my own experience with using the reflog to fix stupid mistakes I've made on the command line, and is divided into three sections.

* [Undoing amended commits](#undo-amend)
* [Reverting bad merges](#undo-merge)
* [Recovering hard resets](#undo-hard-reset)

### What is the reflog?

The [reflog](https://www.kernel.org/pub/software/scm/git/docs/git-reflog.html) is a special mechanism (which acts very similarly to a branch) that contains any changes to the data in your repository. This includes commiting changes, creating and checking out branches, and even hard resets. It's a handy timeline, going a step further from the usual history tree, that you can use to recover any data you may have misplaced.

Let's walk through a couple of use-cases on a [real repository](https://github.com/jdan/reflog-example).

    $ git init
    Initialized empty Git repository in /Users/jordan/Projects/reflog-example/.git/
    $ echo "Hello, world" > hello.txt
    $ git add .
    $ git commit -m "initial commit."
    [master (root-commit) 9056e55] initial commit.
     1 file changed, 1 insertion(+)
     create mode 100644 hello.txt

<a id="undo-amend"></a>
### Example A: Undoing an Amended Commit

`git commit --amend` is a great way to consolidate your work. Missed a semicolon? No need to make an entirely new commit for that, just amend the previous one! But, what if we want to **undo** an amend to a commit? We can't revert a particular commit, since we only want to remove *some* of the changes in a commit. Seems tricky, but it really isn't. Let's start by amending our initial commit.

    $ echo "Goodnight, moon" >> hello.txt
    $ git add .
    $ git commit --amend
    [master e1a2208] initial commit.
     1 file changed, 2 insertions(+)
     create mode 100644 hello.txt

Now if we view our commit, we'll see two additions at the bottom.

    $ git show HEAD
    commit e1a22086fda87daff79fe2bf179372a46abc3044
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:46:34 2013 -0700

        initial commit.

    diff --git a/hello.txt b/hello.txt
    new file mode 100644
    index 0000000..f48e806
    --- /dev/null
    +++ b/hello.txt
    @@ -0,0 +1,2 @@
    +Hello, world
    +Goodnight, moon

But what if we wanted to split this up into two commits? This example is trivial, but in the real world you may accidentally amend 100 changes to a previous commit (with 100 changes of its own!) We don't want them combined, so how can we separate them? **This is where the reflog comes into play**. Let's see what we get when we run `git reflog`.

    $ git log
    commit e1a22086fda87daff79fe2bf179372a46abc3044
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:46:34 2013 -0700

        initial commit.
    $ git reflog
    e1a2208 HEAD@{0}: commit (amend): initial commit.
    9056e55 HEAD@{1}: commit (initial): initial commit.

While `git log` only has one entry (which makes sense considering we only have one commit), `git reflog` actually consists of *two* entries. This is awesome, we now have some extra material to work with. Notice how the left column looks suspiciously similar to a log? Instead of commits, we're dealing with **reflog entries**, but they behave just like commits on a branch. To demonstrate this, let's go ahead and do a soft reset.

    $ git reset --soft 9056e55
    $ git diff --staged
    diff --git a/hello.txt b/hello.txt
    index a5c1966..f48e806 100644
    --- a/hello.txt
    +++ b/hello.txt
    @@ -1 +1,2 @@
     Hello, world
    +Goodnight, moon

Awesome. Now our staged changes consist of just the second addition we made on the master branch. Let's verify that our first change is still in tact.

    $ git show HEAD
    commit 9056e55e384cbae33a0aaf9b2a861cb20c20ace0
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:46:34 2013 -0700

        initial commit.

    diff --git a/hello.txt b/hello.txt
    new file mode 100644
    index 0000000..a5c1966
    --- /dev/null
    +++ b/hello.txt
    @@ -0,0 +1 @@
    +Hello, world

Now, let's go ahead and commit our changes.

    $ git commit -m "Second commit"
    [master d9b0af2] Second commit
     1 file changed, 1 insertion(+)
    $ git log
    commit d9b0af228fa2f4e9ac0c453faf5a652b5ccfa55e
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:58:55 2013 -0700

        Second commit

    commit 9056e55e384cbae33a0aaf9b2a861cb20c20ace0
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:46:34 2013 -0700

        initial commit.

We've successfully separated an amended commit into two separate commits.

You'll notice that the reflog itself reflects the changes we've just made, in case we want to go back yet again.

    $ git reflog
    d9b0af2 HEAD@{0}: commit: Second commit
    9056e55 HEAD@{1}: reset: moving to 9056e55
    e1a2208 HEAD@{2}: commit (amend): initial commit.
    9056e55 HEAD@{3}: commit (initial): initial commit.

<a id="undo-merge"></a>
### Example B: Rolling Back a Bad Merge

Let's say we've merged some changes from a branch. If our correspondent worked alongside master for quite some time and never [cleaned up](http://blog.steveklabnik.com/posts/2012-11-08-how-to-squash-commits-in-a-github-pull-request) his or her changes, we could be dealing with a messy rollback. Let's see how we would resolve this issue using the reflog.

    $ git merge my-awesome-branch
    Updating d9b0af2..29ef6ec
    Fast-forward
     hello.txt | 3 +++
     1 file changed, 3 insertions(+)
    $ git log
    commit 29ef6ec17401576b7be9ecfd3cf8eeecb8e26288
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 23:07:41 2013 -0700

        Changes on another branch
        ...

Looking at reflog we should see a nice summary of our recent activity.

    $ git branch -D my-awesome-branch
    Deleted branch my-awesome-branch (was 29ef6ec).
    $ git reflog
    29ef6ec HEAD@{0}: merge my-awesome-branch: Fast-forward
    d9b0af2 HEAD@{1}: checkout: moving from my-awesome-branch to master
    29ef6ec HEAD@{2}: commit: Changes on another branch
    d9b0af2 HEAD@{3}: checkout: moving from master to my-awesome-branch
    d9b0af2 HEAD@{4}: commit: Second commit
    9056e55 HEAD@{5}: reset: moving to 9056e55
    e1a2208 HEAD@{6}: commit (amend): initial commit.
    9056e55 HEAD@{7}: commit (initial): initial commit.

We have a few options here. We can revert back to a time before the branch was even created, when the commit was made on the branch, or just before we merged into master. For our use-case, we simply want to undo our merge. `d9b0af2` looks promising (but there are other equally good choices here). This time, we'll do a *hard* reset, since we don't need to stage any changes before a merge.

    $ git reset --hard d9b0af2
    HEAD is now at d9b0af2 Second commit
    $ git log
    commit d9b0af228fa2f4e9ac0c453faf5a652b5ccfa55e
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:58:55 2013 -0700

        Second commit

    commit 9056e55e384cbae33a0aaf9b2a861cb20c20ace0
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:46:34 2013 -0700

        initial commit.

Looks good! But now, what if we wanted to go back to our deleted branch?

    $ git branch
    * master
    $ git co my-awesome-branch
    error: pathspec 'my-awesome-branch' did not match any file(s) known to git.

Well that's kind of a bummer. According to our previous example, we expect the reflog to indicate a point in time where we were working on a separate unmerged branch. What gives? Let's take another gander at the reflog.

    $ git reflog
    d9b0af2 HEAD@{0}: reset: moving to d9b0af2
    29ef6ec HEAD@{1}: merge my-awesome-branch: Fast-forward
    d9b0af2 HEAD@{2}: checkout: moving from my-awesome-branch to master
    29ef6ec HEAD@{3}: commit: Changes on another branch
    d9b0af2 HEAD@{4}: checkout: moving from master to my-awesome-branch
    d9b0af2 HEAD@{5}: commit: Second commit
    9056e55 HEAD@{6}: reset: moving to 9056e55
    e1a2208 HEAD@{7}: commit (amend): initial commit.
    9056e55 HEAD@{8}: commit (initial): initial commit.

Hm, `29ef6ec` indicates a commit on our branch. Let's explore.

    $ git co 29ef6ec
    Note: checking out '29ef6ec'.
      ...
    HEAD is now at 29ef6ec... Changes on another branch
    $ git log
    commit 29ef6ec17401576b7be9ecfd3cf8eeecb8e26288
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 23:07:41 2013 -0700

        Changes on another branch
        ...

This looks promising! Let's go ahead and make a branch here.

    $ git co -b my-awesome-branch
    Switched to a new branch 'my-awesome-branch'
    $ git log
    commit 29ef6ec17401576b7be9ecfd3cf8eeecb8e26288
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 23:07:41 2013 -0700

        Changes on another branch
        ...

Success! We've now successfully recovered our branch. How about master? Is our rogue commit still separate from the master branch?

    $ git co master
    Switched to branch 'master'
    $ git log
    commit d9b0af228fa2f4e9ac0c453faf5a652b5ccfa55e
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:58:55 2013 -0700

        Second commit

Yep.

<a id="undo-hard-reset"></a>
### Example C: Recovering from a Hard Reset

At this point you should be fairly comfortable with the reflog, and can now apply it to many different situations. To really nail it down, let's go through one more common example: recovering the data from a hard reset. Just as a refresher, consider the state of our master branch.

    $ git log
    commit d9b0af228fa2f4e9ac0c453faf5a652b5ccfa55e
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:58:55 2013 -0700

        Second commit

    commit 9056e55e384cbae33a0aaf9b2a861cb20c20ace0
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:46:34 2013 -0700

        initial commit.

If we wanted to completely wipe the most recent commit - "Second commit" - we can do that rather easily.

    $ git reset --hard 9056e55e384cbae33a0aaf9b2a861cb20c20ace0
    HEAD is now at 9056e55 initial commit.
    $ git log
    commit 9056e55e384cbae33a0aaf9b2a861cb20c20ace0
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:46:34 2013 -0700

        initial commit.

And voilà, it's gone. But, what if that commit had some important data in it? What if we were careless with our hard resets, and accidentally removed important changes? Sometimes this really happens, and we can use the reflog to our advantage and recover the lost changes.

Once again, let's consult the reflog.

    $ git reflog
    9056e55 HEAD@{0}: reset: moving to 9056e55e384cbae33a0aaf9b2a861cb20c20ace0
    d9b0af2 HEAD@{1}: checkout: moving from save-branch to master
    29ef6ec HEAD@{2}: checkout: moving from 29ef6ec17401576b7be9ecfd3cf8eeecb8e26288 to save-branch
    29ef6ec HEAD@{3}: checkout: moving from master to 29ef6ec
    d9b0af2 HEAD@{4}: reset: moving to d9b0af2
    29ef6ec HEAD@{5}: checkout: moving from my-awesome-branch to master
    ...

Here we'll see lots of data, but we're only considered with the first two entries: the current state, and the previous checkout.

> As a sidenode, feel free to check out [reflog, your safety net](http://gitready.com/intermediate/2009/02/09/reflog-your-safety-net.html) on git ready, which goes on to explain how to clean up old entries in your reflog.

Now, all we need to do is trek back to that previous entry. Easy stuff.

    $ git reset --hard d9b0af2
    HEAD is now at d9b0af2 Second commit
    $ git log
    commit d9b0af228fa2f4e9ac0c453faf5a652b5ccfa55e
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:58:55 2013 -0700

        Second commit

    commit 9056e55e384cbae33a0aaf9b2a861cb20c20ace0
    Author: Jordan Scales <scalesjordan@gmail.com>
    Date:   Sun Aug 4 22:46:34 2013 -0700

        initial commit.

And there you have it, we've successfully recovered data from a hard reset.

<a id="closing-notes"></a>
### Closing Notes

I hope you found this little guide useful, and I bet you are now more than capable of solving a variety of problems using the reflog. You may have noticed that git tries really, *really* hard not to lose your data and includes [many other](https://www.kernel.org/pub/software/scm/git/docs/git-fsck.html) beautiful utilities to recover lost changes (tools that exceed the scope of this introductory article).

Once you start rebasing and changing history, recovering that seemingly lost data becomes more and more important. A good understanding of the reflog can relieve your headache when things go wrong.

> If you enjoyed this article, let me know! I appreciate all the feedback I can get. You can follow me on twitter at [@jdan](http://twitter.com/jdan)
