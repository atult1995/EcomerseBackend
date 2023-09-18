const express=require('express')
const router=express.Router()
const User=require('../model/user')
const auth=require('../middleware/auth')
router.post("/user",async (req,res)=>{
    const user=new User(req.body)
    try{
        const token=await user.generateAuthTokens()
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send({"Error":e})
    }

})
router.post("/user/login",async (req,res)=>{
    try{
        const user=await User.findByCredantial(req.body.email,req.body.password)
        const token=await user.generateAuthTokens()
        res.status(200).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
})
router.post("/user/logout",auth,async(req,res)=>{
    console.log("logout")
   try{
        req.user.tokens=req.user.tokens.filter((token)=>token.token!=req.token)
        await req.user.save()
        console.log(req.user)
        res.status(200).send({"msg":"Successfully logout"})
   }catch(e){
        res.status(500).send(e)
   }
})
router.get("/user/profile/me",auth,async(req,res)=>{
        res.status(200).send(req.user)
})

router.patch("/user/profile/me",auth,async(req,res)=>{
    const allowedUpdates=["name","email","password","address"]
    const updateFields=Object.keys(req.body)
    const isAllowed=updateFields.every((updateField)=>{
        return allowedUpdates.includes(updateField)
    })
    if(!isAllowed){
        res.status(500).send({"Error":"Some Feilds are not allowed to update"})
    }
    try{
        allowedUpdates.forEach((update)=>{
            return req.user[update]=req.body[update]
        })
        await req.user.save()
        res.status(200).send({"Msg":"Updated"})
    }catch(e){
        res.status(200).send({"Error":e})
    }


})

module.exports=router