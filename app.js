const express = require('express')
const bodyParser = require("body-parser")
const itemRoutes = require('./routes')
const morgan = require('morgan')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/items',itemRoutes)

app.get("/", (req, res, next) => {
  return res.json("Start with /items");
});

app.use((req, res, next) => {
  const err = new Error("404 Not Found")
  err.status = 404
  return next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});