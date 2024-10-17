const express = require("express");
const userAuth = require("../middlewares/auth");
const { validFields } = require("../utils/signup");
const bcrypt=require('bcrypt');
const User = require("../model/Schema");
const validator=require('validator')
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validFields(req)){
        throw new Error('not updatable')
    }
    let loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((x) => (loggedInUser[x] = req.body[x]));
    console.log(loggedInUser);

    await loggedInUser.save();
    res.send("updated successfully");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;
    if (!validator.isStrongPassword(req.body.password)) {
      throw new Error(
        "This password is invalid,it should be 8 to 15 characters long,should Contain at least one uppercase letter,one lowercase letter,one numeric,one special character"
      );
    }
    let hashPassword=await bcrypt.hash(req.body.password,10)
    loggedInUser.password=hashPassword
    await loggedInUser.save();
    res.send({status:"password updated successfully",data:loggedInUser});
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = profileRouter;
