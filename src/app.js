let express = require("express");
let adminAuth = require("../auth");
let app = express();

app.use("/", (err, req, res, next) => {
  console.log("default-route");
  if (err) {
    res.status(500).send("something wrong");
  }
});
app.get("/getData", adminAuth, (req, res, next) => {
  throw new Error("error at fetching");
  res.send("data fetched successfully");
});

app.get("/hi", (req, res, next) => {
  res.send("hi-route");
});

app.listen(7777, () => {
  console.log("listening port 7777");
});
