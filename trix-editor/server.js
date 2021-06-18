const express = require("express")
const fs = require("fs")
const multer = require("multer")
const path = require("path")
const TurndownService = require("turndown")

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  fs.createReadStream(path.join(__dirname, "editor.html")).pipe(res)
})

app.use(express.static(path.join(__dirname, "..", "public")))
app.use(express.static(path.join(__dirname, "public")))

const TRIX_DIST = [__dirname, "..", "node_modules", "trix", "dist"]

function serve(file, res) {
  fs.createReadStream(file).pipe(res)
}

app.get("/vendor/trix.css", (req, res) => {
  serve(path.join(...TRIX_DIST, "trix.css"), res)
})

app.get("/vendor/trix.js", (req, res) => {
  serve(path.join(...TRIX_DIST, "trix.js"), res)
})

app.post("/create", (req, res) => {
  // title, route, date

  // TODO: figcaption should be alt text?
  const turndownService = new TurndownService()
  const md = turndownService.turndown(req.body.content)
  const filename = `${req.body.date}-${req.body.slug}.md`

  fs.writeFileSync(
    path.join(__dirname, "..", "articles", filename),
    [
      "---",
      `title: ${req.body.title}`,
      `route: ${req.body.route}`,
      `date: ${req.body.date}`,
      "---",
      "",
      md,
    ].join("\n")
  )

  res.send(
    `<a href="http://localhost:8080/${req.body.route}">${req.body.route}</a>`
  )
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "img"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e9)
    // TODO: other extensions besides png
    cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix + ".png")
  },
})
const upload = multer({ storage: storage })

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ url: "/img/" + req.file.filename })
})

app.listen(3000, () => {
  console.log("Editor running at http://localhost:3000")
})
