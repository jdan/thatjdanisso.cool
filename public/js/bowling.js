document.addEventListener("DOMContentLoaded", function() {
  var graph = document.getElementById("graph")
  var stats = document.getElementById("stats")
  var scoreboard = document.getElementById("scoreboard")

  function generateEmptyGame() {
    var frames = []
    for (var i = 0; i < 9; i++) {
      frames.push({
        throws: [null, null],
        score: null,
      })
    }

    frames.push({
      throws: [null, null, null],
      score: null,
    })

    return {
      frames: frames,
      currentFrame: 0,
      isComplete: false,
    }
  }

  function scoreGame(game) {
    var thisFrameScore
    for (var i = 0; i < 10; i++) {
      if (game.frames[i].throws[0] === null) {
        break
      }

      if (i === 9) {
        var firstThrow = game.frames[i].throws[0] || 0
        var secondThrow = game.frames[i].throws[1] || 0
        var thirdThrow = game.frames[i].throws[2] || 0

        thisFrameScore = firstThrow + secondThrow + thirdThrow
      } else {
        // Fetch the next two throws in case we get a mark
        var firstBonusThrow = game.frames[i + 1].throws[0] || 0
        var secondBonusThrow
        if (firstBonusThrow === 10) {
          // If we're in the 9th frame, pick the second throw of
          // the next frame as the 10th frame can have multiple
          // strikes
          if (i === 8) {
            secondBonusThrow = game.frames[i + 1].throws[1] || 0
          } else {
            secondBonusThrow = game.frames[i + 2].throws[0] || 0
          }
        } else {
          secondBonusThrow = game.frames[i + 1].throws[1] || 0
        }

        var firstThrow = game.frames[i].throws[0] || 0
        var secondThrow = game.frames[i].throws[1] || 0

        if (firstThrow === 10) {
          thisFrameScore = 10 + firstBonusThrow + secondBonusThrow
        } else if (firstThrow + secondThrow === 10) {
          thisFrameScore = 10 + firstBonusThrow
        } else {
          thisFrameScore = firstThrow + secondThrow
        }
      }

      if (i === 0) {
        game.frames[i].score = thisFrameScore
      } else {
        game.frames[i].score = game.frames[i - 1].score + thisFrameScore
      }
    }
  }

  function generateThrow(game) {
    var isNewFrame = game.frames[game.currentFrame].throws[0] === null

    if (isNewFrame) {
      var firstThrow = Math.floor(Math.random() * 11)
      game.frames[game.currentFrame].throws[0] = firstThrow

      if (firstThrow === 10 && game.currentFrame !== 9) {
        game.currentFrame++
      }
    } else {
      if (game.currentFrame !== 9) {
        var lastThrow = game.frames[game.currentFrame].throws[0]
        var nextThrow = Math.floor(Math.random() * (10 - lastThrow + 1))

        game.frames[game.currentFrame].throws[1] = nextThrow

        if (game.currentFrame !== 9) {
          game.currentFrame++
        }
      } else {
        var firstThrow = game.frames[game.currentFrame].throws[0]
        var secondThrow = game.frames[game.currentFrame].throws[1]

        if (firstThrow === 10 && secondThrow === null) {
          var secondThrow = Math.floor(Math.random() * 11)
          game.frames[game.currentFrame].throws[1] = secondThrow
        } else if (secondThrow === null) {
          var secondThrow = Math.floor(Math.random() * (10 - firstThrow + 1))

          game.frames[game.currentFrame].throws[1] = secondThrow

          if (firstThrow + secondThrow !== 10) {
            game.isComplete = true
          }
        } else if (firstThrow === 10 && secondThrow === 10) {
          var thirdThrow = Math.floor(Math.random() * 11)
          game.frames[game.currentFrame].throws[2] = thirdThrow
          game.isComplete = true
        } else if (firstThrow === 10) {
          var thirdThrow = Math.floor(Math.random() * (10 - secondThrow + 1))

          game.frames[game.currentFrame].throws[2] = thirdThrow
          game.isComplete = true
        } else if (firstThrow + secondThrow === 10) {
          var thirdThrow = Math.floor(Math.random() * 11)
          game.frames[game.currentFrame].throws[2] = thirdThrow
          game.isComplete = true
        }
      }
    }
  }

  function renderScoreBoard(game) {
    var frame
    scoreboard.innerHTML = ""

    var firstHalf = document.createElement("div")
    firstHalf.classList.add("scoreboard-half")

    var secondHalf = document.createElement("div")
    secondHalf.classList.add("scoreboard-half")

    for (var i = 0; i < 5; i++) {
      frame = game.frames[i]

      firstHalf.appendChild(renderFrame(frame.score, frame.throws, i === 9))
    }

    var mobileSpacer = document.createElement("div")
    mobileSpacer.classList.add("mobile-spacer")
    firstHalf.appendChild(mobileSpacer)

    for (var i = 5; i < 10; i++) {
      frame = game.frames[i]

      secondHalf.appendChild(renderFrame(frame.score, frame.throws, i === 9))
    }

    scoreboard.appendChild(firstHalf)
    scoreboard.appendChild(secondHalf)
  }

  function throwToString(points) {
    if (points === null) {
      return " "
    } else if (points === 10) {
      return "X"
    } else if (points === 0) {
      return "-"
    } else {
      return points + ""
    }
  }

  // Not the 10th though!
  function frameToString(throws) {
    if (throws[0] === 10) {
      return ["X", ""]
    } else if (throws[0] + throws[1] === 10) {
      return [throwToString(throws[0]), "/"]
    } else {
      return throws.map(throwToString)
    }
  }

  function renderFrame(score, throws, isTenth) {
    var contents
    if (isTenth) {
      // 10th frame has weird logic
      if (throws === undefined) {
        contents = ["", "", ""]

        // Two strikes = XX[third throw]
      } else if (throws[0] === 10 && throws[1] === 10) {
        contents = [
          throwToString(10),
          throwToString(10),
          throwToString(throws[2]),
        ]

        // X[normal frame]
      } else if (throws[0] === 10) {
        contents = [throwToString(10)].concat(frameToString(throws.slice(1)))

        // [normal frame][bonus throw]
      } else if (throws[0] + throws[1] === 10) {
        contents = frameToString(throws.slice(0, 2)).concat([
          throwToString(throws[2]),
        ])
      } else {
        contents = frameToString(throws)
      }

      // Make contents 3 items long... lol
      if (contents.length < 3) {
        contents.push("")
      }

      if (contents.length < 3) {
        contents.push("")
      }
    } else {
      contents = frameToString(throws)

      if (contents.length < 2) {
        contents.push("")
      }
    }

    var frame = document.createElement("div")
    frame.classList.add("frame")

    contents.forEach(function(formattedThrow) {
      var square = document.createElement("div")
      square.classList.add("square")
      square.innerHTML = formattedThrow

      frame.appendChild(square)
    })

    var scoreDiv = document.createElement("div")
    scoreDiv.classList.add("score")
    scoreDiv.innerHTML = score

    frame.appendChild(scoreDiv)

    return frame
  }

  function renderGraph(graphDiv) {
    graphDiv.innerHTML = ""

    var distribution = []
    for (var i = 0; i <= 300; i++) {
      distribution[i] = scores[i] || 0
    }
    var highestPopulation = Math.max.apply(null, distribution)

    var bar
    for (var i = 0; i <= 300; i++) {
      bar = document.createElement("div")
      bar.classList.add("bar")
      bar.style.height = ((scores[i] || 0) / highestPopulation) * 100 + "%"
      graphDiv.appendChild(bar)
    }
  }

  function renderStats(statsDiv) {
    var distribution = []
    for (var i = 0; i <= 300; i++) {
      distribution[i] = scores[i] || 0
    }

    var numGames = distribution.reduce(function(a, b) {
      return a + b
    })

    var allGames = []
    var totalPins = 0
    var minScore, maxScore

    var mode = 0,
      modeIndex

    for (var i = 0; i <= 300; i++) {
      for (var j = 0; j < distribution[i]; j++) {
        allGames.push(i)
        totalPins += i
      }

      if (distribution[i] > 0) {
        maxScore = i

        if (minScore === undefined) {
          minScore = i
        }
      }

      if (distribution[i] > mode) {
        mode = distribution[i]
        modeIndex = i
      }
    }

    var mean = Math.floor((totalPins / numGames) * 100) / 100

    // TODO: Odd/even
    var median
    if (allGames.length % 2 === 1) {
      median = allGames[Math.floor(allGames.length / 2)]
    } else {
      median =
        (allGames[Math.floor(allGames.length / 2)] +
          allGames[Math.floor(allGames.length / 2) - 1]) /
        2
    }

    statsDiv.innerHTML =
      "<div>" +
      [
        '<span class="stats-label">Games:</span><span> ' + numGames + "</span>",
        '<span class="stats-label">Min:</span><span> ' + minScore + "</span>",
        '<span class="stats-label">Max:</span><span> ' + maxScore + "</span>",
        '<span class="stats-label">Mean:</span><span> ' + mean + "</span>",
        '<span class="stats-label">Median:</span><span> ' + median + "</span>",
        '<span class="stats-label">Mode:</span><span> ' +
          modeIndex +
          " (" +
          mode +
          " games)</span>",
      ].join("</div><div>") +
      "</div>"
  }

  var scores = []
  var game = generateEmptyGame()
  renderScoreBoard(game)

  var throwButton = document.getElementById("throw")
  var gameButton = document.getElementById("game")
  var manyGamesButton = document.getElementById("many-games")

  function handleThrowClick(e) {
    e.preventDefault()

    if (game.isComplete) {
      game = generateEmptyGame()
    }

    generateThrow(game)
    scoreGame(game)
    renderScoreBoard(game)

    if (game.isComplete) {
      var score = game.frames[9].score
      scores[score] = (scores[score] || 0) + 1
      renderGraph(graph)
      renderStats(stats)
    }
  }

  function simulateGame() {
    game = generateEmptyGame()
    while (!game.isComplete) {
      generateThrow(game)
    }

    scoreGame(game)
    renderScoreBoard(game)

    var score = game.frames[9].score
    scores[score] = (scores[score] || 0) + 1
    renderGraph(graph)
  }

  function handleGameClick(e) {
    e.preventDefault()
    simulateGame()
    renderStats(stats)
  }

  function handleManyClick(e) {
    e.preventDefault()
    var simulations = 0

    ;(function run() {
      simulations++
      simulateGame()
      renderStats(stats)

      if (simulations < 100) {
        setTimeout(run, 5)
      }
    })()
  }

  throwButton.addEventListener("click", handleThrowClick)
  throwButton.addEventListener("touchend", handleThrowClick)

  gameButton.addEventListener("click", handleGameClick)
  gameButton.addEventListener("touchend", handleGameClick)

  manyGamesButton.addEventListener("click", handleManyClick)
  manyGamesButton.addEventListener("touchend", handleManyClick)
})
