const fs = require("fs")
const path = require("path")
const { Feed } = require("feed")
const constants = require("./constants.json")
const { fstat } = require("fs")

const me = {
  name: "Jordan Scales",
  email: "jdan@hey.com",
  link: "https://jordanscales.com",
}

module.exports = (articles) => {
  const feed = new Feed({
    title: constants.defaultTitle,
    description: constants.defaultDescription,
    id: constants.url,
    link: constants.url,
    language: "en",
    image: `${constants.url}/img/me.png`,
    favicon: `${constants.url}/img/me-ico.png`,
    copyright: "CC BY-NC 4.0 Jordan Scales",
    generator: "awesome",
    feedLinks: {
      json: `${constants.url}/json`,
      atom: `${constants.url}/atom`,
    },
    author: me,
  })

  articles
    .filter((article) => !article.hidden)
    .forEach((article) => {
      feed.addItem({
        title: article.title,
        id: `${constants.url}${article.route}`,
        link: `${constants.url}${article.route}`,
        description: article.description,
        content: article.body,
        author: [me],
        date: new Date(article.date),
        image: `${constants.url}/img/me.png`,
      })
    })

  return fs.promises.writeFile(path.join("output", "feed.atom"), feed.atom1())
}
