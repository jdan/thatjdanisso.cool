var ncp = require("ncp")
var path = require("path")

function saveStaticFile(filePath) {
    return new Promise((resolve, reject) => {
        var relativePath = path.relative("public", filePath)
        var destination = path.join("output", relativePath)

        ncp(filePath, destination, (err) => {
            if (err) {
                return reject(err)
            }

            resolve("ok")
        })
    })
}

module.exports = saveStaticFile
