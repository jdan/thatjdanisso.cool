var fm = require("front-matter")
var fs = require("fs")
var hljs = require("highlight.js")
var makeTweetUrl = require("./make-tweet-url.js")
var marked = require("marked")
var strftime = require("strftime")

marked.setOptions({
    gfm: true,
    highlight: (code) => hljs.highlightAuto(code).value,
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

            var rawDate = article.attributes.date;
            ["FullYear", "Month", "Date", "Hours"].forEach((field) => {
                rawDate["set" + field](rawDate["getUTC" + field]())
            })

            var date = strftime("%B %d, %Y", rawDate)
            var tweetUrl = makeTweetUrl(article)

            resolve(Object.assign({}, article.attributes, {
                filename,
                summary,
                date,
                tweetUrl,
                body: marked(article.body),
            }))
        })
    })
}

module.exports = loadArticle
