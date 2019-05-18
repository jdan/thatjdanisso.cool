module.exports = function (title, route) {
    const baseUrl = "https://twitter.com/intent/tweet";
    const text = "“" + title + "” by @jdan – http://thatjdanisso.cool" + route;

    return baseUrl + "?text=" + encodeURIComponent(text);
};
