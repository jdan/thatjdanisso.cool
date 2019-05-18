var glob = require("glob")
var generateTags = require("./generate-tags.js")
var loadArticle = require("./load-article.js")
var saveArticle = require("./save-article.js")
var saveIndex = require("./save-index.js")
var saveStaticFile = require("./save-static-file.js")
var save32x32 = require("./save-32x32.js")

glob("articles/*.md", (err, articles) => {
  if (err) {
    throw err
  }

  Promise.all(articles.map(loadArticle))
    .then(articles => {
      var promises = articles.map(saveArticle)

      promises.push(saveIndex(articles, "output/index.html"))
      promises.push(generateTags(articles))

      return Promise.all(promises)
    })
    .then(
      () => console.log("Articles built."),
      err => {
        console.log("Error building articles")
        console.log(err)
      }
    )
})

glob("public/**/*.*", (err, staticFiles) => {
  if (err) {
    throw err
  }

  Promise.all(staticFiles.map(saveStaticFile))
    //.then(save32x32)
    .then(
      () => console.log("Static files built."),
      err => {
        console.log("Error saving static files")
        console.log(err)
      }
    )
})
