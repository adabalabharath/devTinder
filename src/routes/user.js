const express = require("express");
const connectionModel = require("../model/ConnectionRequest");
const userAuth = require("../middlewares/auth");
const User = require("../model/Schema");
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
    res.status(404).send(error.message);
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
    res.status(404).send(error.message);
  }
});


userRouter.get('/users/feed',userAuth,async(req,res)=>{
  try{
  let loggedInUser=req.user

  let page=req.query.page || 1;
  let limit=req.query.limit || 10
  limit=limit>10?10:limit
  let skip=(page-1)*limit
    const urRequests=await connectionModel.find({
      $or:[
        {fromId:loggedInUser._id},
        {toUserId:loggedInUser._id}
      ]
    }).select('fromId toUserId')

    const uniqId=new Set()

    urRequests.forEach(element => {
       uniqId.add(element.fromId)
       uniqId.add(element.toUserId)
    });
    //console.log(uniqList)
    const showFeed=await User.find({
      $and:[
        {_id:{$nin:Array.from(uniqId)}},
      {_id:{$ne:loggedInUser._id}}
      ]
    }).skip(skip).limit(limit)
    if(showFeed.length===0){
      res.send('sorry,out of data')
    }
   res.send(showFeed)
  }catch(error){
    res.status(401).send(error.message)
  }
})

module.exports = userRouter;
