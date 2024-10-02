const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://saibharathadabala:dev123@ascii.rluwb.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
