const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

let count = 0;

const countMiddleware = function(req, res, next) {
  if (count <= 5 && req.originalUrl === "/messages") {
    req.allowedRequest = true;
    count++;
  } else if (count > 5 && req.originalUrl === "/messages") {
    req.allowedRequest = false;
    res.status(429).send({
      message: "Too many requests, try again tomorrow"
    });
  }
  next();
};

app.use(countMiddleware);

app.post("/messages", (req, res) => {
  if (req.body.text == null) {
    res.status(400).send({
      message: "Please supply text parameter"
    });
  }
  if (req.allowedRequest) {
    console.log("Your text was:" + req.body.text);
    res.json({ message: "Message received loud and clear" });
  }
});

const port = 3000;
app.listen(port, () => console.log("listening on port 3000!"));
