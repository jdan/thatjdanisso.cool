---
title: Removing "Collaborator Spam" from Your GitHub Feed
slug: github-collaborator-spam
description: Devious GitHub users are adding prominent members as collaborators to their repositories in an attempt to gain exposure. Here's how to stop it.
---

I'm sick of seeing this garbage on GitHub.

![A series of items on the GitHub activity feed in the form of "X added Y to Z"](/img/github-spam.png)

Project owners shamelessly adding dozens upon dozens of famous open source developers, in an attempt to get a link to their project on as many GitHub feeds as possible (while [chalking it up to "username errors"](https://github.com/joni2back/angular-filemanager/issues/59)). To be honest, I don't really care what repositories my friends get added to - even if legitimately. The feature has never proven useful to me.

**Here's how to get rid of it.**

## Using [AdBlock Plus](https://adblockplus.org/)

We can remove the spammy elements from the page using a custom AdBlock filter. First, open up your extension settings (I'm using Chrome):

![Chrome's extension settings page, showing the options for the AdBlock Plus extension](/img/extension-settings.png)

Then, click the "Add your own filters" tab, enter the following filter string, and click "Add Filter":

```
github.com##.alert.member_add
```

![The "Add your own filters" tab of AdBlock Plus's extension settings, showing the string "github.com##.alert.member_add" entered in an input box.](/img/custom-filters.png)

This filter is made up of three parts:

* `github.com` - the domain on which to filter
* `##` - a separator
* `.alert.member_add` - the CSS selector, matching the various `<div class="alert member_add simple">` elements containing the spam

Refresh your GitHub tab, and rejoice in your spam-free activity feed.

## Using a custom userscript

Alternatively, you can use the following userscript.

```
// ==UserScript==
// @name          Remove collab spam
// @description   Removes "X added Y to Z" spam from the GitHub activity feed
// @include       https://github.com/*
// ==/UserScript==
//
// by @jdan <http://thatjdanisso.cool>
// MIT Licensed

[].slice.call(
    document.querySelectorAll(".alert.member_add")
  )
  .forEach(function(item) {
    item.remove()
  })
```

Copy and paste the above code into your favorite editor and save it as **remove-collab-spam.user.js**. In Chrome, you can simply drag this file into **chrome://extensions**.

On Firefox, install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) and navigate to the Greasemonkey "User scripts" tab of **about:addons**.

![Firefox's about:addons page, showing a selected "User scripts" tab on the left, with a drag-and-drop area on the right](/img/greasemonkey.png)

Drag the file here, then accept the following confirmation dialog.

![A confirmation dialog from Greasemonkey for installing the userscript. The confirmation includes the title and description of the userscript](/img/greasemonkey-confirm.png)

You can even customize the userscript to remove/keep elements containing particular usernames if you're into that sort of thing.

```
// Always show tj-related activity items
if (!/\/tj/.test(item.innerHTML)) {
    item.remove()
}
```

But I think we can safely remove 'em all :)
