var mkdirp = require("mkdirp")
var path = require("path")

var saveIndex = require("./save-index.js")

function generateTags(articles) {
    return new Promise((resolve, reject) => {
        var articlesByTag = {}
        articles.forEach((article) => {
            article.tags.forEach((tag) => {
                if (!articlesByTag[tag]) {
                    articlesByTag[tag] = [article]
                } else {
                    articlesByTag[tag].push(article)
                }
            })
        })

        Object.keys(articlesByTag).forEach((tag) => {
            var articles = articlesByTag[tag]
            articles.sort((a, b) => {
                return (b.rawDate || 0) - (a.rawDate || 0)
            })

            var tagPath = path.join("output", "tags", tag)
            mkdirp(tagPath, (err) => {
                if (err) {
                    return reject(err)
                }

                resolve(saveIndex(
                    articles.filter((article) => !article.hidden),
                    path.join(tagPath, "index.html"),
                    tag + " | jordan scales",
                    "-- " + tag + " posts --"))
            })
        })
    })
}

module.exports = generateTags
