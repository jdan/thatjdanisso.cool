---
title: Clicking with a Keyboard
route: /a11y/clicking-with-a-keyboard
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

Consider the following `<div>` button with an `onclick` event.

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

<div id="div-mouse-example" class="demo flex" aria-hidden="true" aria-label="showing onclick events with a div and mouse point">
    <div class="button">Display</div>
    <div class="mouse-pointer">
        <div class="head"></div>
        <div class="tail"></div>
    </div>
    <div class="output">&nbsp;</div>
</div>