const ncp = require("ncp")
const path = require("path")
const mkdirp = require("mkdirp")

function saveStaticFile(filePath) {
    return new Promise((resolve, reject) => {
        const relativePath = path.relative("public", filePath)
        const destination = path.join("output", relativePath)

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
