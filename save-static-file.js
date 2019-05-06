var ncp = require("ncp")
var path = require("path")
var mkdirp = require("mkdirp")

function saveStaticFile(filePath) {
    return new Promise((resolve, reject) => {
        var relativePath = path.relative("public", filePath)
        var destination = path.join("output", relativePath)

        mkdirp(path.dirname(destination), err => {
            if (err) {
                return reject(err);
            }

            ncp(filePath, destination, (err) => {
                if (err) {
                    return reject(err)
                }

                resolve("ok")
            })
        })
    })
}

module.exports = saveStaticFile
