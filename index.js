var glob = require("glob")

var generateTags = require("./generate-tags.js")
var loadArticle = require("./load-article.js")
var saveArticle = require("./save-article.js")
var saveIndex = require("./save-index.js")

glob("articles/*.md", (err, articles) => {
    if (err) {
        throw err
    }

    Promise
        .all(articles.map(loadArticle))
        .then((articles) => {
            var promises = articles.map(saveArticle)

            promises.push(saveIndex(articles, "output/index.html"))
            promises.push(generateTags(articles))

            return Promise.all(promises)
        })
        .then(
            () => console.log('All done!'),
            (err) => console.log(err))
})
