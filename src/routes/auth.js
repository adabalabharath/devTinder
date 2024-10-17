const express = require("express");
const bcrypt = require("bcrypt");
const {validatePost} = require("../utils/signup");
const User = require("../model/Schema");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validatePost(req);
    const { firstName, lastName, email, password, gender, age, skills } =
      req.body;
    let hashPassword = await bcrypt.hash(password, 10);

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

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("invalid creds");
    }

    let validPassword = await user.validatePassword(password);

    if (validPassword) {
      let token = await user.getJWT();
      res.cookie("token", token);
      res.send({status:"logged in successfully",user});
    } else {
      throw new Error("invalid creds");
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("logged out successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = authRouter;
