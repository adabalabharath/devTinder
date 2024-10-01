const adminAuth=(req,res,next)=>{
    console.log('admin middleware')
    let auth='xyz'
    let isAuth=auth==='xyz'
    if(isAuth){
        next()
    }else{
        res.status(401).send('unauthorised')
    }
}

module.exports=adminAuth