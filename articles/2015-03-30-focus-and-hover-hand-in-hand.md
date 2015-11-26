---
title: Focus vs. Hover
route: /a11y/focus-vs-hover
date: 2015-04-03
description: Visual interactions should never require a mouse, but a common CSS pattern leaves many keyboard-wielding visitors in the dark.
---

Visual interactions should never require a mouse.

Consider the ever-popular `:hover` selector, which is used to declare styles
on elements under a mouse cursor.

```css
.nav-link {
    color: #ffffff;
}

.nav-link:hover {
    opacity: 0.8;
}
```

<span class="sr-only">
    The following example shows a mouse cursor hovering over various items
    in a navigation bar which highlight as the mouse passes over them.
</span>
<div class="demo hover-a11y" aria-hidden="true">
    <div class="row flex">
        <div class="mouse-pointer">
            <div class="head"></div>
            <div class="tail"></div>
        </div>
        <div class="button">Home</div>
        <div class="button">About</div>
        <div class="button">Products</div>
    </div>
</div>

If we attempt to access these buttons with a keyboard, however, we're met
with an unfortunate short-coming.

Nothing happens.

<span class="sr-only">
    The following example is just a navigation bar with three links and no
    animation, because we did not declare our styles correctly.
</span>
<div class="demo hover-a11y no-active" aria-hidden="true">
    <div class="row flex">
        <div class="button">Home</div>
        <div class="button">About</div>
        <div class="button">Products</div>
    </div>
</div>

Instead, we need to use the `:focus` selector, which is used to declare styles
on focused elements - the items on the page that keyboards can highlight with
subsequent presses of the tab key.

**All we need to do is add the `:focus` selector**, so that it is applied in
addition to the hover styles.

```css
.nav-link:hover, .nav-link:focus {
    opacity: 0.8;
}
```

Ta-da, now we get the same effect even when we're using a keyboard instead of
a mouse! **This helps users keep track of their location in their page**, and
also presents the same information that a mouse-wielding user would receive.

<span class="sr-only">
    The example below shows three links on a nav bar highlighting in sequence
    as a theoretical keyboard tabs to each of them.
</span>
<div class="demo hover-a11y" aria-hidden="true">
    <div class="row flex">
        <div class="button">Home</div>
        <div class="button">About</div>
        <div class="button">Products</div>
    </div>
</div>

We can do still do better, though. Many of your visitors will be unable to
detect subtle color changes (and, in some cases, very obvious ones!), so we'll
add an underline to the link.

It's okay if you don't want this on hover - since a mouse cursor is a good
visual indicator in and of itself - but it's pretty essential to do this on
focus for visitors using the keyboard.

```css
.nav-link:hover, .nav-link:focus {
    opacity: 0.8;
}

.nav-link:focus {
    text-decoration: underline;
}
```

<span class="sr-only">
    The following example is the same as the previous example, but the links
    also have an underline when focused.
</span>
<div class="demo hover-a11y with-underline" aria-hidden="true">
    <div class="row flex">
        <div class="button">Home</div>
        <div class="button">About</div>
        <div class="button">Products</div>
    </div>
</div>

**Side note**: While browsers like Chrome *will* declare a
`focus-ring-color` outline for focused elements by default (a glowing blue
outline), it's far too easy to accidentally remove these - and sadly many do!

Adding a `:focus` rule is a trivial change with a potentially great impact, so
there's no real reason not make use of it. Always keep keyboard accessibility
in mind when writing style rules for interactions, and try not to leave any of
your users in the dark.
