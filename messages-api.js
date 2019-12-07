const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;
app.listen(port, () => console.log("listening on port 3000!"));
app.post("/messages", (req, res) => {
  console.log("Your text was:" + req.body.text);
  res.json({ message: "Message received loud and clear" });
});

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);
