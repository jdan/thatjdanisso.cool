const fm = require("front-matter")
const fs = require("fs")
const hljs = require("highlight.js")
const katex = require("katex")
const makeTweetUrl = require("./make-tweet-url.js")
const marked = require("marked")
const strftime = require("strftime")

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

      const article = fm(data.toString())
      const body = marked(
        article.body.replace(
          /\$\$([^$]*)\$\$/g,
          (_, tex) => katex.renderToString(tex)
        )
      )

      let summary = article.attributes.summary
      if (!summary) {
        const paragraphBreak = article.body.match(/\r?\n\r?\n/)
        if (paragraphBreak) {
          summary = marked(article.body.slice(0, paragraphBreak.index))
        } else {
          summary = article.body
        }
      }

      const rawDate = article.attributes.date
      let date = null

      if (rawDate) {
        ;["FullYear", "Month", "Date", "Hours"].forEach(field => {
          rawDate["set" + field](rawDate["getUTC" + field]())
        })

        date = strftime("%B %d, %Y", rawDate)
      }

      const tweetUrl = makeTweetUrl(article)
      const defaults = { hidden: false, timeless: false }

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
