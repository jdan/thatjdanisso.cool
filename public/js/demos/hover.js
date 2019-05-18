var highlightIntervals = [
  {
    on: [550, 3900],
    off: [1400, 4150],
  },
  {
    on: [1700, 3500],
    off: [1900, 3800],
  },
  {
    on: [2000],
    off: [3400],
  },
]

function highlightSequence() {
  var examples = [].slice.call(
    document.querySelectorAll(".hover-a11y:not(.no-active)")
  )

  examples.forEach(function(example) {
    console.log(example)
    var links = [].slice.call(example.querySelectorAll(".button"))

    highlightIntervals.forEach(function(timers, i) {
      timers.on.forEach(function(ms) {
        setTimeout(function() {
          links[i].classList.add("active")
        }, ms)
      })

      timers.off.forEach(function(ms) {
        setTimeout(function() {
          links[i].classList.remove("active")
        }, ms)
      })
    })
  })
}

setInterval(highlightSequence, 6000)
highlightSequence() // call once to start
