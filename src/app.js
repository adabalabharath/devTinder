let express = require("express");
let adminAuth = require("../auth");
let app = express();

app.use("/", (req, res, next) => {
  console.log("default-route");
  next();
});
app.get("/getData", adminAuth, (req, res, next) => {
  res.send("data fetched successfully");
});

app.get("/hi", (req, res, next) => {
  res.send("hi-route");
});

app.listen(7777, () => {
  console.log("listening port 7777");
});
