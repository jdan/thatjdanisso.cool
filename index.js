var ejs = require("ejs")
var fs = require("fs")
var glob = require("glob")

var loadArticle = require("./load-article.js")
var saveArticle = require("./save-article.js")

function saveIndex(articles) {
    articles.sort((a, b) => {
        return (b.rawDate || 0) - (a.rawDate || 0)
    })

    return new Promise((resolve, reject) => {
        fs.readFile("templates/index.ejs", (err, data) => {
            if (err) {
                return reject(err)
            }

            var indexBodyHTML = ejs.render(data.toString(), {
                articles: articles.filter((article) => {
                    return !article.hidden
                }),
            })

            fs.readFile("templates/layout.ejs", (err, data) => {
                var indexHTML = ejs.render(data.toString(), {
                    title: "jordan scales",
                    body: indexBodyHTML,
                })

                fs.writeFile("build/index.html", indexHTML, (err) => {
                    if (err) {
                        return reject(err)
                    }

                    resolve("ok!")
                })
            })
        })
    })
}

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
