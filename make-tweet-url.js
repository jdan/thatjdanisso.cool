function makeTweetUrl(article) {
    var title = article.attributes.title
    var route = article.attributes.route

    var baseUrl = "https://twitter.com/intent/tweet"
    var text = "“" + title + "” by @jdan – http://thatjdanisso.cool" + route

    return baseUrl + "?text=" + encodeURIComponent(text)
}

module.exports = makeTweetUrl
