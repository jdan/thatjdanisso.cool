const $editor = document.getElementById("editor")
const $title = document.getElementById("editor-title")
const $date = document.getElementById("editor-date")
const $content = document.getElementById("editor-content")
const $loader = document.getElementById("editor-loader")
const $save = document.getElementById("editor-save-button")

const $outputTitle = document.querySelector(".title h1")
const $outputDate = document.querySelector(".date")
const $outputContent = document.querySelector(".content")

$loader.addEventListener("change", e => {
  if (e.target.value) {
    const article = JSON.parse(e.target.value)

    $title.value = article.title
    document.title = article.title + " | jordan scales"
    $outputTitle.innerHTML = article.title

    $date.value = strftime("%F", new Date(article.rawDate))
    $outputDate.innerHTML = article.date

    $content.value = article.rawBody
    $outputContent.innerHTML = article.body

    document.getElementById("editor-description").value = article.description

    // Hax!!! Get rid of the "articles/" prefix
    document.getElementById("editor-filename").value = article.filename.replace(
      /^articles\//,
      ""
    )
    document.getElementById("editor-route").value = article.route
  }
})

$title.addEventListener("keyup", e => {
  document.title = e.target.value + " | jordan scales"
  $outputTitle.innerHTML = e.target.value
})

$content.addEventListener("keyup", e => {
  $outputContent.innerHTML = marked(e.target.value)

  renderMathInElement(document.body, {
    displayMode: true,
  })
})

$content.addEventListener("keydown", e => {
  if (9 === e.keyCode) {
    e.preventDefault()
    const textarea = e.target
    const pos = textarea.selectionStart
    textarea.value =
      textarea.value.slice(0, pos) + "  " + textarea.value.slice(pos)
  }
})

$date.addEventListener("keyup", e => {
  const rawDate = new Date(e.target.value)
  ;["FullYear", "Month", "Date", "Hours"].forEach(field => {
    rawDate["set" + field](rawDate["getUTC" + field]())
  })

  $outputDate.innerHTML = strftime("%B %d, %Y", rawDate)
})

$editor.addEventListener("submit", e => {
  e.preventDefault()
  $save.innerHTML = "Saving..."

  fetch("/save", {
    method: "POST",
    body: new FormData($editor),
  }).then(res => {
    if (res.status === 200) {
      $save.innerHTML = "Saved!"
    } else {
      $save.innerHTML = "Error :( Try again"
    }

    setTimeout(() => {
      $save.innerHTML = "Save"
    }, 1500)
  })
})
