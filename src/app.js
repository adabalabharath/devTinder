let express = require("express");
const connectDB = require("./config/database");
const User = require("./model/Schema");
const bcrypt = require("bcrypt");
const validatePost = require("./utils/signup");
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
    validatePost(req);
    const { firstName, lastName, email, password, gender, age, skills } =
      req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    let user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      gender,
      age,
      skills,
    });
    await user.save();
    res.status(201).send({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let emailUser = await User.findOne({email});
    console.log(emailUser);
    if (!emailUser) {
      throw new Error("Invalid Credentials");
    }
    let validPassword = await bcrypt.compare(password, emailUser.password)
    if (validPassword) {
      res.send("logged in successfully");
    } else {
      throw new Error("Invalid credentails");
    }
  } catch (error) {
    res.status(400).send(error.message);
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
