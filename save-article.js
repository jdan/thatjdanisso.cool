var ejs = require("ejs")
var fs = require("fs")
var mkdirp = require("mkdirp")
var path = require("path")

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

module.exports = saveArticle
