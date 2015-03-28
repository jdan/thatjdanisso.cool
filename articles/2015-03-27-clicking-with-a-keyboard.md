---
title: Clicking with a Keyboard
route: /a11y/clicking-with-a-keyboard
hidden: true
---

Not everyone can use a mouse.

Across the spectrum of disabilities, different types of users rely on different
mechanisms for navigating around a webpage. In many of these cases a pointing
device such as a mouse or trackpad is simply not an option, either due to
insufficient motor skills, or being unable to see.

Beyond this, there is also the power user who prefers to stick to their
keyboard while using your website.

Not everyone *wants* to use a mouse.

Yet, the web is full of interactive elements which require a mouse. Why is
that? The most frequent offender is the common `<div>`. Now, the `<div>`
itself is very useful, but it's vague. It's a broad container of sorts. Not a
button, not a navbar, not an image - just a big ol' rectangle taking up a few
rows in our webpage.

But, many still try to *make* it one of those things and, rather
unfortunately, miss out on all the cool things that happen when we use the
**right tag for the job**.

## Let's talk about clicking

Consider the following `<div>` with an `onclick` event handler.

```
<div id="action-button">Display</div>
<span id="output"></span>
<script>
    var btn = document.getElementById("action-button");
    var display = document.getElementById("output");

    btn.onclick = function() {
        display.innerHTML = "Clicked!";
        setTimeout(function() {
            display.innerHTML = "";
        }, 1000);
    };
</script>
```

<div id="div-mouse-example" class="a11y-onclick demo flex" aria-hidden="true" aria-label="showing onclick events with a div and mouse pointer">
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

```
<div id="action-button" tabindex="0">Display</div>
```

<div id="div-keyboard-example" class="a11y-onclick demo flex" aria-hidden="true" aria-label="attempting to fire an onclick with a div and a keyboard">
    <div class="row">
        <div class="enter-key">enter</div>
    </div>
    <div class="button focused">Display</div>
    <div class="output">&nbsp;</div>
</div>

Unfortunately, nothing happens :( Our "button" is listening for a click event,
but we're attempting to activate it with a keyboard.

Let's fix this by adding a `keypress` event handler.

```
<div id="action-button" tabindex="0">Display</div>
<span id="output"></span>
<script>
    var btn = document.getElementById("action-button");
    var display = document.getElementById("output");

    var activate = function() {
        display.innerHTML = "Clicked!";
        setTimeout(function() {
            display.innerHTML = "";
        }, 1000);
    };

    btn.onclick = activate;
    btn.onkeypress = function(e) {
        // enter key
        if (e.keyCode === 13) {
            activate();
        }
    };
</script>
```

<div id="div-keyboard-example-2" class="a11y-onclick demo flex" aria-hidden="true" aria-label="an example with a div and an onkeypress event">
    <div class="row">
        <div class="enter-key">enter</div>
    </div>
    <div class="button focused">Display</div>
    <div class="output">&nbsp;</div>
</div>

I'll call that a success, sort of! The code's a bit longer now (even after
a bit of refactoring), but it definitely works - our "button" can be
activated with both a mouse and a keyboard, just like a real button!

But hold on a second, why don't we just *use* a real button?

## Semantic buttons

As I briefly mentioned earlier, there's nothing special about a `<div>`. It
doesn't have any magical behavior, it's just a container. We can shape it,
paint it, and make it *look* like a button, but it's not a button.

We write some extra JavaScript to make it *act* like a button, but it's **not
a button**.

In fact, we're doing all this extra work (and often skipping it), when in
reality we could just a real button. Let's try it.

```
<button id="action-button">Display</button>
<span id="output"></span>
<script>
    var btn = document.getElementById("action-button");
    var display = document.getElementById("output");

    btn.onclick = function() {
        display.innerHTML = "Clicked!";
        setTimeout(function() {
            display.innerHTML = "";
        }, 1000);
    };
</script>
```

<div id="div-keyboard-example-3" class="a11y-onclick demo flex" aria-hidden="true" aria-label="an example with a div and an onkeypress event">
    <div class="row">
        <div class="enter-key">enter</div>
    </div>
    <div class="button focused">Display</div>
    <div class="output">&nbsp;</div>
</div>
