var loadArticle = require("./load-article.js")
var saveArticle = require("./save-article.js")

var articles = [
    "articles/2014-06-22-hello-world.md",
    "articles/2015-08-10-reenergizing-my-love-for-web-development.md",
]

Promise.all(articles.map(loadArticle))
    .then((articles) => {
        return Promise.all(articles.map(saveArticle))
    })
    .then(() => console.log('cool!'))
