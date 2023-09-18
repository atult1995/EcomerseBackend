const jwt=require('jsonwebtoken')
const Admin=require('../model/admin')

const adminAuth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decode=jwt.verify(token,'thisismykey')
        const admin=await Admin.findOne({_id:decode._id,'tokens.token':token})
        if(!admin){
            res.status(501).send({suc:false})
        }
        req.admin=admin
        req.token=token
        next()
    }catch(e){
        res.status(500).send({suc:false})
    }
}
module.exports=adminAuth