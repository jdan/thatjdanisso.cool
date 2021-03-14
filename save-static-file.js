const ncp = require("ncp")
const path = require("path")
const mkdirp = require("mkdirp")

function saveStaticFile(filePath) {
  const relativePath = path.relative("public", filePath)
  const destination = path.join("output", relativePath)

  return mkdirp(path.dirname(destination)).then((_) => {
    ncp(filePath, destination, (err) => {
      if (err) {
        throw err
      }
    })
  })
}

module.exports = saveStaticFile
