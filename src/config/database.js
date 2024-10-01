const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://saibharathadabala:devTinder@ascii.rluwb.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
