function makeTweetUrl(article) {
  const title = article.attributes.title
  const route = article.attributes.route

  const baseUrl = "https://twitter.com/intent/tweet"
  const text = "“" + title + "” by @jdan – http://thatjdanisso.cool" + route

  return baseUrl + "?text=" + encodeURIComponent(text)
}

module.exports = makeTweetUrl
