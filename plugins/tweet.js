module.exports = function(title, route) {
    var baseUrl = "https://twitter.com/intent/tweet";
    var text = "“" + title + "” by @jdan – http://thatjdanisso.cool" + route;

    return baseUrl + "?text=" + encodeURIComponent(text);
};
