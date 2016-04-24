---
title: Let's go bowling
route: /toyshop/bowling
date: 2016-04-24
description: An experiment in scoring random bowling games.
---

<link rel="stylesheet" type="text/css" href="/css/bowling.css">

<div id="demo">
    <div id="graph"></div>
    <div id="stats"></div>
    <div id="scoreboard"></div>
    <div id="controls">
        <button id="throw">Generate throw</button>
        <button id="game">Generate game</button>
        <button id="many-games">Generate 100 games</button>
    </div>
    <script src="/js/bowling.js"></script>
</div>

Here's a little experiment in scoring random bowling games. Each throw
consists of a random number between 0 and the number of pins remaining. This
is not even remotely close to modeling the actual physical aspect of knocking
pins down, but nevertheless I was curious how a point distribution may look.

A side goal of this experiment was to be more pragmatic in my coding. I've
written bowling scoring logic dozens of times, each an attempt at making the
code clearer and more readable. I decided to throw all of that out the window
and just get it done(TM).
