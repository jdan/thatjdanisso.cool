setInterval(function() {
    var example = document.querySelector("#div-mouse-example");
    var output = document.querySelector("#div-mouse-example .output");

    setTimeout(function() {
        example.className = "demo flex active";
        output.innerHTML = "Clicked!";
    }, 1000);

    setTimeout(function() {
        example.className = "demo flex";
        output.innerHTML = " ";
    }, 2000);
}, 2500);