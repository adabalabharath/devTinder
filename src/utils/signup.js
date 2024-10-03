 let validator=require('validator')
 
 const validatePost=(req)=>{

    if(!req.body.firstName || !req.body.email){
        throw new Error("firstname or email is missing")
    }
    if (!validator.isStrongPassword(req.body?.password)) {
      throw new Error(
        "This password is invalid,it should be 8 to 15 characters long,should Contain at least one uppercase letter,one lowercase letter,one numeric,one special character"
      );
    }
    if (!validator.isEmail(req.body?.email)) {
      throw new Error(
        "Invalid email format"
      );
    }
    // if (!validator.isURL(req.body?.photoUrl)) {
    //   throw new Error(
    //     "Invalid URL format"
    //   );
    // }
    
}

module.exports=validatePost