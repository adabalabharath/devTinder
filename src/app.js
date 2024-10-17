let express = require("express");
const connectDB = require("./config/database");
const User = require("./model/Schema");
const bcrypt = require("bcrypt");
const validatePost = require("./utils/signup");
let cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");
const cors=require('cors')
let app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const requestRouter=require('./routes/request');
const userRouter = require("./routes/user");
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)
connectDB()
  .then(() => {
    console.log("db established successfully");
    app.listen(7777, () => {
      console.log("listening port 7777");
    });
  })
  .catch((error) => console.error(error.message));
