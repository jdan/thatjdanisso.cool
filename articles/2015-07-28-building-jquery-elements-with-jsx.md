---
title: Building jQuery Elements with JSX
slug: jquery-and-jsx
hidden: true
---

I've been spending a good amount of time with [tota11y](https://khan.github.io/tota11y), an accessibility visualization tool we shipped last month at Khan Academy. Specifically, spending time doing code cleanup to make it easier for contributors to wrap their head around how the tool works.

tota11y is built with webpack, and written in ES6 using the wonderful Babel library. Its UI is mostly powered by jQuery. Now you're almost up to speed - that wasn't so bad, was it?

Well, my jQuery chops are not very good, and tota11y rather quickly devolved into jQuery soup. tota11y is modular, meaning that each "plugin" lives in its own directory that encapsulates its logic, templates, and styling. It's clean and provides a lot of flexibility, but the boundaries between these modules is where things get a little suspicious.

##

```js
let $toolbar = $(toolbarTemplate());
$("body").append($toolbar);

$toolbar.find(".tota11y-toolbar-toggle").click((e) => {
    e.preventDefault();
    e.stopPropagation();
    $toolbar.toggleClass("tota11y-expanded");
});
```

Where `toolbarTemplate` corresponds to the following handlebars template.

```html
<div class="tota11y tota11y-toolbar">
    <div class="tota11y-toolbar-body">
        <div class="tota11y-plugins"></div>
    </div>
    <a href="#" class="tota11y-toolbar-toggle">
        Open
    </a>
</div>
```


