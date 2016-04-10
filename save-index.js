var ejs = require("ejs")
var fs = require("fs")

function saveIndex(articles, outputFile, title, banner) {
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
                banner,
            })

            fs.readFile("templates/layout.ejs", (err, data) => {
                var indexHTML = ejs.render(data.toString(), {
                    title: title || "jordan scales",
                    body: indexBodyHTML,
                })

                fs.writeFile(outputFile, indexHTML, (err) => {
                    if (err) {
                        return reject(err)
                    }

                    resolve("ok!")
                })
            })
        })
    })
}

module.exports = saveIndex
