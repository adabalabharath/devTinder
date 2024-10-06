const express=require('express');
const userAuth = require('../middlewares/auth');
const profileRouter=express.Router()


profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports=profileRouter