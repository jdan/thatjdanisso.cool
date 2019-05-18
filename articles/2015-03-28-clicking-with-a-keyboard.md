---
title: Clicking with a Keyboard
date: 2015-03-28
route: /a11y/clicking-with-a-keyboard
description: The importance of semantic markup, and getting keyboard accessibility for free. After all, not everyone can use a mouse.
tags: a11y
---

Not everyone can use a mouse.

Across the spectrum of disabilities, different types of users rely on different
mechanisms for navigating around a webpage. In many of these cases a pointing
device such as a mouse or trackpad is simply not an option, due to either
insufficient motor skills, or being unable to see.

In fact, a [2003 study of accessible technology potential](http://www.microsoft.com/enable/research/phase1.aspx)
commissioned by Microsoft found that an estimated _"7% (or 12 million) of
working-age adults have a severe dexterity difficulty or impairment,"_ one that
would likely prevent them from using a mouse or trackpad.

It's tough to say how many are attempting use _your_ website, of course, but
there is also the power user who prefers to stick to their keyboard while
using your website.

Not everyone _wants_ to use a mouse. Still, the web is full of interactive elements which require a mouse. Why is that?

Let's talk about the most common offender - the `<div>`. Now, the `<div>`
itself is very useful, but it's vague. It's a broad container of sorts. Not a
button, not a navbar, not an image - just a big ol' rectangle taking up a few
rows in our webpage.

Yet, many try to _make_ it one of those things and, rather unfortunately, miss
out on all the cool things that would happen if we had used the **right tag
for the job**.

## Let's talk about clicking

Consider the following `<div>` with an `onclick` event handler.

```html
<div id="action-button">Display</div>
<span id="output"></span>
<script>
  var btn = document.getElementById("action-button")
  var display = document.getElementById("output")

  btn.onclick = function() {
    display.innerHTML = "Clicked!"
    setTimeout(function() {
      display.innerHTML = ""
    }, 1000)
  }
</script>
```

<span class="sr-only">
    Depicted below is a demo of the code above interacting with a mouse
    pointer. The button works as expected.
</span>
<div class="a11y-onclick demo flex" aria-hidden="true">
    <div class="button">Display</div>
    <div class="mouse-pointer">
        <div class="head"></div>
        <div class="tail"></div>
    </div>
    <div class="output">&nbsp;</div>
</div>

This example does pretty much exactly what you'd expect. We've got a "button"
and clicking it triggers some action - in this case, putting some text in a
separate `<div>` before it disappears.

## Keyboard-accessible `<div>`s

But what if we want to add keyboard access to this "button"? First, we'll need
to understand that users access items with a keyboard through the **tab order**.
Links (`<a>`) and inputs (`<input>`) will, as you probably already know,
automatically be navigated to and from using the tab key.

Our fancy `<div>`, on the other hand, can't - a `<div>` (and many other tags
like `<p>`, `<b>`, etc) will not find themselves in the tab order, so we'll
have to put in some extra work. We'll start by specifying `tabindex="0"` on
the tag.

In the following example we've tabbed to the button and focused it (as shown
by the black outline), and now we'll attempt to activate the button using the
enter key (just as we would on a hyperlink or form).

```html
<div id="action-button" tabindex="0">Display</div>
```

<span class="sr-only">
    Depicted below is the same demo as before, this time interacting with
    the enter key. The button does not seem to do anything.
</span>
<div class="a11y-onclick demo no-active no-output" aria-hidden="true">
    <div class="row">
        <div class="enter-key">enter</div>
    </div>
    <div class="flex">
        <div class="button focused">Display</div>
        <div class="output">&nbsp;</div>
    </div>
</div>

Unfortunately, nothing happens :( Our "button" is listening for a click event,
but we're attempting to activate it with a keyboard.

Let's try and fix this by adding a `keypress` event handler.

```html
<div id="action-button" tabindex="0">Display</div>
<span id="output"></span>
<script>
  var btn = document.getElementById("action-button")
  var display = document.getElementById("output")

  var activate = function() {
    display.innerHTML = "Clicked!"
    setTimeout(function() {
      display.innerHTML = ""
    }, 1000)
  }

  btn.onclick = activate
  btn.onkeypress = function(e) {
    // enter key
    if (e.keyCode === 13) {
      activate()
    }
  }
</script>
```

<span class="sr-only">
    Depicted below is a demo of the code above interacting with the enter key.
    The button now works similarly to the mouse pointer example before.
</span>
<div class="a11y-onclick demo no-active" aria-hidden="true">
    <div class="row">
        <div class="enter-key">enter</div>
    </div>
    <div class="flex">
        <div class="button focused">Display</div>
        <div class="output">&nbsp;</div>
    </div>
</div>

I'll call that a success, sort of! The code's a bit longer now (even after
a bit of refactoring), but it definitely works - our "button" can be
activated with both a mouse and a keyboard, just like a real button.

But hold on a second, why don't we just _use_ a real button?

## Semantic buttons

As I briefly mentioned earlier, there's nothing special about a `<div>`. It
doesn't have any magical behavior, it's just a container. We can shape it,
paint it, and make it _look_ like a button, but it's not a button.

We can write some extra JavaScript to make it _act_ like a button, but it's
**not a button**.

In fact, we're doing all this extra work (and often skipping it), when in
reality we could just a real button, the semantic `<button>` tag. Let's try
it.

```html
<button id="action-button">Display</button>
<span id="output"></span>
<script>
  var btn = document.getElementById("action-button")
  var display = document.getElementById("output")

  btn.onclick = function() {
    display.innerHTML = "Clicked!"
    setTimeout(function() {
      display.innerHTML = ""
    }, 1000)
  }
</script>
```

<span class="sr-only">
    Depicted below is a demo of the code above interacting with both a mouse
    pointer and the enter key. Both of these interactions work.
</span>
<div class="a11y-onclick demo flex" aria-hidden="true">
    <div class="button">Display</div>
    <div class="mouse-pointer">
        <div class="head"></div>
        <div class="tail"></div>
    </div>
    <div class="output">&nbsp;</div>
</div>

<div class="a11y-onclick demo no-active" aria-hidden="true" aria-label="an example with a div and an onkeypress event">
    <div class="row">
        <div class="enter-key">enter</div>
    </div>
    <div class="flex">
        <div class="button focused">Display</div>
        <div class="output">&nbsp;</div>
    </div>
</div>

Excellent! Now that we are using the semantic `<button>` tag, **we get a click
event for free**. No need to track both a `click` and `keypress` handler here,
just a `click` will do.

**It turns out that in order to make our button accessible, we don't have to
do much.** In fact, the _only_ difference between our first example and this
one is that we've replaced the `<div>` with a `<button>` - seriously!

## Sane markup goes a long way

Beyond the obvious markup clarity and keyboard accessibility gains, we also
unlock a few bonus features when we use a `<button>` instead of a `<div>`. For
instance, a copy of VoiceOver on OSX will display the following:

![VoiceOver for Mac describing the button as "Display, button"](/img/voiceover.png)

Letting users with screen readers know that "Display" corresponds to a button
that can be activated with either their enter key or space bar.

So go forth and prevent your contemporaries from skipping the semantic markup,
make sure your buttons play nicely with the keyboard, and stop trying to copy
browser behavior provided to you **for free**.

It doesn't take much, but it makes a big difference.
