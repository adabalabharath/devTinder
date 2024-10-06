const express=require('express');
const userAuth = require('../middlewares/auth');
const requestRouter=express.Router()

requestRouter.post("/sendRequest", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user.firstName + " sent request");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports=requestRouter