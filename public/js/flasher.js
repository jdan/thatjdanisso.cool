document.addEventListener("DOMContentLoaded", function() {
  var flashEl = document.querySelector(".flash")
  var flashText = flashEl.innerHTML
  var flashItems, i

  flashEl.innerHTML = ""
  for (var i = 0; i < flashText.length; i++) {
    item = document.createElement("span")
    item.innerHTML = flashText[i]
    item.className = "flash-item"

    // animation delay
    item.style.animationDelay = item.style.webkitAnimationDelay = item.style.mozAnimationDelay = item.style.oAnimationDelay =
      1 + 0.1 * i + "s"

    flashEl.appendChild(item)
  }
})
