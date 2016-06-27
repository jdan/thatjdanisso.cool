---
title: Color Blindness Simulator
route: /toyshop/color-blindness
description: An experiment with color blindness simulation.
date: 2016-05-27
hidden: true
---

Here's an experiment with using SVG Filters to simulate color blindness. Props
to [Kyo Nagashima](https://github.com/hail2u) for [the inspiration](https://github.com/hail2u/color-blindness-emulation).

<link rel="stylesheet" type="text/css" href="/css/color-blindness.css">

<div class="demo-content">
    <div id="controls">
        <div class="control">
            <label for="red">
                <span class="label-text">Red</span>
                <span class="label-value" id="red-value">(100)</span>
            </label>
            <input id="red" type="range" min="0" max="100" value="100" step="5">
        </div>
        <div class="control">
            <label for="blue">
                <span class="label-text">Blue</span>
                <span class="label-value" id="blue-value">(100)</span>
            </label>
            <input id="blue" type="range" min="0" max="100" value="100" step="5">
        </div>
        <div class="control">
            <label for="green">
                <span class="label-text">Green</span>
                <span class="label-value" id="green-value">(100)</span>
            </label>
            <input id="green" type="range" min="0" max="100" value="100" step="5">
        </div>
    </div>
    <img src="https://color.adobe.com/build2.0.0-buildNo/resource/img/kuler/color_wheel_730.png" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Ishihara_9.png" />
    <svg>
        <defs>
            <filter id="color-filter">
                <feColorMatrix
                    id="color-matrix"
                    in="SourceGraphic"
                    type="matrix"
                    values="1, 0, 0, 0, 0
                            0, 1, 0, 0, 0
                            0, 0, 1, 0, 0
                            0, 0, 0, 1, 0" />
            </filter>
        </defs>
    </svg>
</div>

<script src="/js/color-blindness.js"></script>
