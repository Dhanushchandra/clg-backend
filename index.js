var express = require("express");
var path = require("path");
var ejs = require("ejs");
var partials = require("express-partials");
var app = express();
const mongoose = require("mongoose");

const Message = require("./models/message");

app.use(express.json());
app.use(partials());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
//DB connect
mongoose
  .connect("mongodb://localhost:27017/clg", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//top level routing
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit_form", function (req, res) {
  const message = new Message(req.body);
  message.save((err, message) => {
    if (err) {
      return res.render("404.ejs");
    }
    res.render("thanks.ejs", { body: req.body });
    console.log(JSON.stringify(req.body));
  });
});

//start server
var http = require("http");

var port = 8000;
app.set("port", port);

var server = http.createServer(app);

server.listen(port);
