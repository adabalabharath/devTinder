const express = require("express");
const userAuth = require("../middlewares/auth");
const connectionModel = require("../model/ConnectionRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/sendRequest/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromId = user._id;
      const status = req.params.status;
      const toUserId = req.params.toUserId;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error(`${status} is invalid`);
      }

      // let checkToUser=await connectionModel.findById(toUserId)
      // console.log(checkToUser)
      // if(!checkToUser){
      //   throw new Error('user do not exists')
      // }

      let isValid = await connectionModel.findOne({
        $or: [
          {
            fromId,
            toUserId,
          },
          {
            fromId: toUserId,
            toUserId: fromId,
          },
        ],
      });

      if (isValid) {
        return res.send("connection already exists");
      }

      const request = new connectionModel({
        fromId,
        toUserId,
        status,
      });

      let connection = await request.save();
      return res.send({
        status: "connection sent successfully",
        data: connection,
      });
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
);

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requestId = req.params.requestId;
    const status = req.params.status;
    const allowedStatus = ["accepted", "rejected"];
    console.log(loggedInUser._id);
    if (!allowedStatus.includes(status)) {
      throw new Error("status not allowed");
    }

    const requests = await connectionModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!requests) {
      throw new Error("no request found");
    }

    const corner = await connectionModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: status,
    });
    if (corner) {
      res.send("already " + `${status}`);
    }
    requests.status = status;
    let changedStatus = await requests.save();
    res.send({ status: `status changed to ${status}`, data: changedStatus });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = requestRouter;
