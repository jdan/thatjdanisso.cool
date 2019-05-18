var fm = require("front-matter")
var fs = require("fs")
var hljs = require("highlight.js")
var makeTweetUrl = require("./make-tweet-url.js")
var marked = require("marked")
var strftime = require("strftime")

marked.setOptions({
  gfm: true,
  highlight: (code, lang) => {
    return lang
      ? hljs.highlight(lang, code).value
      : hljs.highlightAuto(code).value
  },
})

function loadArticle(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        return reject(err)
      }

      var article = fm(data.toString())
      var body = marked(article.body)

      var summary = article.attributes.summary
      if (!summary) {
        var paragraphBreak = article.body.indexOf("\n\n")
        if (paragraphBreak > -1) {
          summary = marked(article.body.slice(0, paragraphBreak))
        } else {
          summary = article.body
        }
      }

      var rawDate = article.attributes.date
      var date = null

      if (rawDate) {
        ;["FullYear", "Month", "Date", "Hours"].forEach(field => {
          rawDate["set" + field](rawDate["getUTC" + field]())
        })

        date = strftime("%B %d, %Y", rawDate)
      }

      var tweetUrl = makeTweetUrl(article)
      var defaults = { hidden: false, timeless: false }

      const tags = article.attributes.tags ? article.attributes.tags.split(", ") : []

      resolve(
        Object.assign({}, defaults, article.attributes, {
          filename,
          summary,
          date,
          rawDate,
          tweetUrl,
          tags,
          rawBody: article.body,
          body,
        })
      )
    })
  })
}

module.exports = loadArticle
