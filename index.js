const glob = require("glob")
const generateTags = require("./generate-tags.js")
const loadArticle = require("./load-article.js")
const saveArticle = require("./save-article.js")
const saveIndex = require("./save-index.js")
const saveStaticFile = require("./save-static-file.js")
const saveFeed = require("./save-feed.js")

glob("articles/*.md", (err, articles) => {
  if (err) {
    throw err
  }

  Promise.all(articles.map(loadArticle))
    .then((articles) => {
      const promises = articles.map(saveArticle)

      promises.push(saveIndex(articles, "output/index.html"))
      promises.push(saveFeed(articles))
      promises.push(generateTags(articles))

      return Promise.all(promises)
    })
    .then(
      () => console.log("Articles built."),
      (err) => {
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
      (err) => {
        console.log("Error saving static files")
        console.log(err)
      }
    )
})
