var glob = require("glob")

var saveIndex = require("./save-index.js")
var loadArticle = require("./load-article.js")
var saveArticle = require("./save-article.js")

glob("articles/*.md", (err, articles) => {
    if (err) {
        throw err
    }

    Promise
        .all(articles.map(loadArticle))
        .then((articles) => {
            var promises = articles.map(saveArticle)
            promises.push(saveIndex(articles))

            return Promise.all(promises)
        })
        .then(
            () => console.log('cool!'),
            (err) => console.log(err))
})
