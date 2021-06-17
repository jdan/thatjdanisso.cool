const cheerio = require("cheerio")
const fetch = require("node-fetch")
const fs = require("fs")
const path = require("path")
const prompt = require("prompt")
const TurndownService = require("turndown")

prompt.message = ""
prompt.delimiter = ""

prompt.start()

prompt.get(
  [
    { name: "url", message: "medium url:" },
    { name: "date", message: "date (yyyy-mm-dd):" },
    {
      name: "filename",
      message: "filename: yyyy-mm-dd-",
      before(value) {
        let filename = `${prompt.history("date").value}-${value}`
        if (!/\.md$/.test(filename)) {
          filename += ".md"
        }
        return filename
      },
    },
    {
      name: "route",
      message: `route: /`,
      before(value) {
        return `/${value}`
      },
    },
  ],
  (err, res) => {
    if (err) throw err
    fetch(res.url)
      .then((res) => res.text())
      .then((body) => {
        const $ = cheerio.load(body)
        const turndownService = new TurndownService()

        // todo: download images
        const md = turndownService.turndown($("article").html())

        fs.writeFileSync(
          path.join(__dirname, "..", "articles", res.filename),
          [
            "---",
            `title: ${$("h1").text()}`,
            `route: ${res.route}`,
            `date: ${res.date}`,
            "---",
            "",
            md,
          ].join("\n")
        )

        console.log(`articles/${res.filename}`)
      })
  }
)
