const exec = require("child_process").exec

const command = [
  "cd 32x32",
  "npm install",
  "npm run build",
  "mv build/static ../output/", // HACK - move static first
  "mv build ../output/32x32",
].join(" && ")

function save32x32() {
  return new Promise((resolve, reject) => {
    console.log(command)
    exec(command, (err, stdout, stderr) => {
      if (err || stderr) {
        return reject(err || stderr)
      }

      resolve(stdout)
    })
  })
}

module.exports = save32x32
