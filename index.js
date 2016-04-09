var ejs = require("ejs")
var fm = require("front-matter")
var fs = require("fs")
var hljs = require("highlight.js")
var marked = require("marked")
var mkdirp = require("mkdirp")
var path = require("path")
var strftime = require("strftime")

marked.setOptions({
    gfm: true,
    highlight: (code) => hljs.highlightAuto(code).value,
})

function makeTweetUrl(article) {
    var title = article.attributes.title
    var route = article.attributes.route

    var baseUrl = "https://twitter.com/intent/tweet"
    var text = "“" + title + "” by @jdan – http://thatjdanisso.cool" + route

    return baseUrl + "?text=" + encodeURIComponent(text)
}

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

function saveArticle(article) {
    return new Promise((resolve, reject) => {
        fs.readFile("templates/article.ejs", (err, articleTemplate) => {
            if (err) {
                return reject(err)
            }

            fs.readFile("templates/layout.ejs", (err, layoutTemplate) => {
                if (err) {
                    return reject(err)
                }

                var articleBodyHTML = ejs.render(
                    articleTemplate.toString(), article)
                var articleHTML = ejs.render(layoutTemplate.toString(), {
                    title: article.title + " | jordan scales",
                    body: articleBodyHTML,
                })
                var articlePath = path.join("build", article.route)

                mkdirp(articlePath, (err) => {
                    if (err) {
                        return reject(err)
                    }

                    fs.writeFile(
                        path.join(articlePath, "index.html"),
                        articleHTML,
                        (err) => {
                            if (err) {
                                return reject(err)
                            }
                            resolve("ok")
                        })
                })
            })
        })
    })
}

var articles = [
    "articles/2014-06-22-hello-world.md",
    "articles/2015-08-10-reenergizing-my-love-for-web-development.md",
]

Promise.all(articles.map(loadArticle))
    .then((articles) => {
        return Promise.all(articles.map(saveArticle))
    })
    .then(() => console.log('cool!'))
