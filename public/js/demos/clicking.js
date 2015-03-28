var examples = [].slice.call(document.querySelectorAll(".a11y-onclick"));
var liveOutputs = [
    document.querySelector("#div-mouse-example .output"),
    document.querySelector("#div-keyboard-example-2 .output")
];

setInterval(function() {
    var output = document.querySelector("#div-mouse-example .output");

    setTimeout(function() {
        examples.forEach(function(el) {
            el.classList.add("active");
        });

        liveOutputs.forEach(function(o) {
            o.innerHTML = "Clicked!";
        });
    }, 1000);

    setTimeout(function() {
        examples.forEach(function(el) {
            el.classList.remove("active");
        });

        liveOutputs.forEach(function(o) {
            o.innerHTML = " ";
        });
    }, 2000);
}, 2500);