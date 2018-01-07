const express = require("express")
const ejs = require("ejs")
const fs = require("fs")
const path = require("path")

const app = express()

app.use("/editor", express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "../public")))

app.get("/", (req, res) => {
  res.end(
    ejs.render(
      fs.readFileSync(path.join(__dirname, "../templates/layout.ejs"), "utf-8"),
      {
        title: "New post | jordan scales",
        isEditor: true,
        body: ejs.render(
          fs.readFileSync(
            path.join(__dirname, "../templates/article.ejs"),
            "utf-8"
          ),
          {
            timeless: false,
            hidden: false,
            date: "Jan 1, 1970",
            title: "New post",
            tags: [],
            body: "<p>Start writing...</p>",
            tweetUrl: "",
          }
        ),
      }
    )
  )
})

console.log("Listening on http://localhost:8080...")
app.listen(8080)
