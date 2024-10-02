let express = require("express");
const connectDB = require("./config/database");
const User = require("./model/Schema");
const bodyParser = require("body-parser");
const validator=require("validator")
let app = express();

app.use(express.json());

// app.use("/hello",(req,res,next)=>{
//   res.send("hello-route")
//   console.log('passed from hello')
//   next()
// })
// app.get("/hello/id",(req,res,next)=>{
//   res.send("hello-id-route")

// })

// app.use("/",(req,res,next)=>{
//   //res.send("default-route")
//   console.log('passed from default')
//   next()
// })

app.post("/signup", async (req, res) => {
  try {
    let user = new User(req.body);
    
    if (!validator.isStrongPassword(req.body?.password)) {
      throw new Error(
        "This password is invalid,it should be 8 to 15 characters long,should Contain at least one uppercase letter,one lowercase letter,one numeric,one special character"
      );
    }
    if (!validator.isEmail(req.body?.email)) {
      throw new Error(
        "Invalid email format"
      );
    }
    if (!validator.isURL(req.body?.photoUrl)) {
      throw new Error(
        "Invalid URL format"
      );
    }
    
    await user.save();
    res.status(201).send({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.get("/getUser", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length < 1) {
      res.send("no user found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.get("/getAll", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.get("/getId/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send("not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await User.findOneAndDelete(req.params.id);
    res.send("deleted successfully");
  } catch (err) {
    res.send(err.message);
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let AllowedUpdates = ["skills", "photoUrl", "gender", "age", "password"];
    let isAllowed = Object.keys(body).every((k) => AllowedUpdates.includes(k));

    if (!isAllowed) {
      throw new Error("update not allowed");
    }

    if (body.skills.length > 5) {
      throw new Error("only 5 skills are allowed");
    }

    let updated = await User.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send({ status: "updated Successfully", updated });
  } catch (error) {
    res.send(error.message);
  }
});

connectDB()
  .then(() => {
    console.log("db established successfully");
    app.listen(7777, () => {
      console.log("listening port 7777");
    });
  })
  .catch((error) => console.error(error.message));
