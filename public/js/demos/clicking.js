var examples = [].slice.call(document.querySelectorAll(".a11y-onclick"));
var outputs = [].slice.call(document.querySelectorAll(".a11y-onclick:not(.no-output) .output"));

setInterval(function() {
    examples.forEach(function(el) {
        el.classList.add("active");
    });

    outputs.forEach(function(o) {
        o.innerHTML = "Clicked!";
    });

    setTimeout(function() {
        examples.forEach(function(el) {
            el.classList.remove("active");
        });

        outputs.forEach(function(o) {
            o.innerHTML = " ";
        });
    }, 1000);
}, 2500);