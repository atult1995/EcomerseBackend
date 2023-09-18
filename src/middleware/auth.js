const jwt=require('jsonwebtoken')
const User=require('../model/user')

const auth=async (req,res,next)=>{
    // console.log("intro to middleware")
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decode=jwt.verify(token,'thisismykey')
        const user=await User.findOne({_id:decode._id,'tokens.token':token})
        if(!user){
            throw new Error({"Error":"Please authenticate"})
        }
        req.user=user
        req.token=token
        next()
    }catch(e){
        res.status(400).send({"Error":"Please authenticate"})
    }
}

module.exports=auth