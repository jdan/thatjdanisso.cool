const ejs = require("ejs")
const fs = require("fs")
const mkdirp = require("mkdirp")
const path = require("path")

function saveArticle(article) {
  fs.readFile("templates/article.ejs", (err, articleTemplate) => {
    if (err) {
      return reject(err)
    }

    fs.readFile("templates/layout.ejs", (err, layoutTemplate) => {
      if (err) {
        return reject(err)
      }

      const articleBodyHTML = ejs.render(articleTemplate.toString(), article)
      const articleHTML = ejs.render(layoutTemplate.toString(), {
        title: article.title + " | jordan scales",
        body: articleBodyHTML,
        description: article.description || article.summary,
      })

      const articlePath = path.join("output", article.route)

      return mkdirp(articlePath).then((_) => {
        fs.writeFile(
          path.join(articlePath, "index.html"),
          articleHTML,
          (err) => {
            if (err) {
              throw err
            }
          }
        )
      })
    })
  })
}

module.exports = saveArticle
