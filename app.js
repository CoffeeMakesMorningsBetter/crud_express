const express = require('express')
const bodyParser = require("body-parser")
const itemRoutes = require('./routes/index.js')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan("tiny"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/items", itemRoutes)

// app.get("/", (req, res, next) => {
//   return res.json("Start with /items");
// });

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});