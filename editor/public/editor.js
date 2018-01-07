const $editor = document.getElementById("editor")
const $title = document.getElementById("editor-title")
const $date = document.getElementById("editor-date")
const $content = document.getElementById("editor-content")

const $outputTitle = document.querySelector(".title h1")
const $outputDate = document.querySelector(".date")
const $outputContent = document.querySelector(".content")

// TODO: Prob want ejs idk
$title.addEventListener("keyup", e => {
  document.title = e.target.value + " | jordan scales"
  $outputTitle.innerHTML = e.target.value
})

$content.addEventListener("keyup", e => {
  $outputContent.innerHTML = marked(e.target.value)
})

$date.addEventListener("keyup", e => {
  $outputDate.innerHTML = e.target.value
})
