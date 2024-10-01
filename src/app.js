let express = require("express");
const connectDB = require("./config/database");
const User = require("./model/Schema");
const bodyParser=require('body-parser')
let app = express();

app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const userDetails = {
    firstName: "msd",
    lastName: "ms",
    email: "msd@gmail.com",
    password: "msd@123",
    age: 30,
    gender: "male",
  };
  let user = new User(userDetails);
  try {
    await user.save();
    res.status(201).send({
            message: 'User created successfully',
            user
        });
  } catch (error) {
    res.status(500).send({
            message: 'User not created',
        });
  }
});

connectDB()
  .then(() => {
    console.log("db established successfully");
    app.listen(7777, () => {
      console.log("listening port 7777");
    });
  })
  .catch(() => console.error("db error"));
