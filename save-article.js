const ejs = require("ejs")
const fs = require("fs")
const mkdirp = require("mkdirp")
const path = require("path")

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

        const articleBodyHTML = ejs.render(articleTemplate.toString(), article)
        const articleHTML = ejs.render(layoutTemplate.toString(), {
          title: article.title + " | jordan scales",
          body: articleBodyHTML,
          description: article.description,
        })

        const articlePath = path.join("output", article.route)

        mkdirp(articlePath, err => {
          if (err) {
            return reject(err)
          }

          fs.writeFile(
            path.join(articlePath, "index.html"),
            articleHTML,
            err => {
              if (err) {
                return reject(err)
              }
              resolve("ok")
            }
          )
        })
      })
    })
  })
}

module.exports = saveArticle
