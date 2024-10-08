const express = require("express");
const connectionModel = require("../model/ConnectionRequest");
const userAuth = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.get("/users/requests/received", userAuth, async (req, res) => {
  try {
    let user = req.user;
    let requests = await connectionModel
      .find({
        toUserId: user._id,
        status: "interested",
      })
      .populate("fromId", "firstName lastName gender age skills");
    res.json({ status: "fetched successfully", data: requests });
  } catch (error) {
    res.send(error.message);
  }
});

userRouter.get("/users/connections", userAuth, async (req, res) => {
  try {
    let user = req.user;
    let requests = await connectionModel
      .find({
        $or: [
          { toUserId: user._id, status: "accepted" },
          { fromId: user._id, status: "accepted" },
        ],
      })
      .populate("fromId", "firstName lastName gender age skills")
      .populate("toUserId", "firstName lastName gender age skills");
    let connections = requests.map((r) => {
      if (r.fromId._id.toString() === user._id.toString()) {
        return r.toUserId;
      }
      return r.fromId;
    });

    res.json({ status: "fetched successfully", data: connections });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = userRouter;
