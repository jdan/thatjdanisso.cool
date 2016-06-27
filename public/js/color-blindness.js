var values = {
    red: 100,
    green: 100,
    blue: 100,
};

function renderLabel(control) {
    document.getElementById(control + "-value").innerText =
            "(" + values[control] + ")"
}

function renderFilter() {
    var matrix = [
        [values.red / 100, 0, 0, 0, 0].join(","),
        [0, values.green / 100, 0, 0, 0].join(","),
        [0, 0, values.blue / 100, 0, 0].join(","),
        [0, 0, 0, 1, 0].join(","),
    ].join("\n")

    document.getElementById("color-matrix").setAttribute("values", matrix)
}

["red", "green", "blue"].forEach(function(control) {
    document.getElementById(control).addEventListener("input", function(e) {
        values[control] = e.target.value

        renderLabel(control)
        renderFilter()
    })
})
