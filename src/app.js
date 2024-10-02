let express = require("express");
const connectDB = require("./config/database");
const User = require("./model/Schema");
const bodyParser=require('body-parser')
let app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  
  let user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({
            message: 'User created successfully',
            user
        });
  } catch (error) {
    res.status(500).send({
            message: 'User not created',
        });
  }
});

app.get("/getUser", async (req,res)=>{
  try{
   const user= await User.find({email:req.body.email})
   if(user.length<1){
    res.send('no user found')
   }else{
     res.send(user)
   }
  }catch(error){
    res.status(500).send('something went wrong')
  }
})

app.get("/getAll", async (req,res)=>{
  try{
   const user= await User.find()
   res.send(user)
  }catch(error){
    res.status(500).send('something went wrong')
  }
})

connectDB()
  .then(() => {
    console.log("db established successfully");
    app.listen(7777, () => {
      console.log("listening port 7777");
    });
  })
  .catch(() => console.error("db error"));
