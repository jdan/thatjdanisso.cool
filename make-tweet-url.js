const { url } = require("./constants.json")

function makeTweetUrl(article) {
  const title = article.attributes.title
  const route = article.attributes.route

  const baseUrl = "https://twitter.com/intent/tweet"
  const text = `“${title}” by @jdan – ${url}${route}`

  return baseUrl + "?text=" + encodeURIComponent(text)
}

module.exports = makeTweetUrl
