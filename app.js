const express = require('express')
const bodyParser = require("body-parser")
const itemRoutes = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/items',itemRoutes)

app.get("/", (req, res) => {
  return res.json("Start with /items");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});