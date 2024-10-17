const jwt = require("jsonwebtoken");
const User = require("../model/Schema");

const userAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    let decoded = await jwt.verify(token, "devTinder");
    let user = await User.findById(decoded._id);

    if (!user) {
      throw new Error("No user found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = userAuth;
