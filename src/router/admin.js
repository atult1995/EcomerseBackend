const AdminEntry=require('../model/admin')
const express=require('express')
const router=express.Router()
const adminAuth=require('../middleware/adminAuth')
router.post('/admin',async(req,res)=>{
    try{
        const admin=await new AdminEntry(req.body)
        await admin.save()
        res.status(201).send({suc:true})
    }catch(e){
        res.status(500).send({Error:e})
    }
})
router.post('/admin/login',async(req,res)=>{
    try{
        const admin=await AdminEntry.findByCredentials(req.body.adminEmail,req.body.adminPassword)
        if(admin){
            const token=await admin.generateAuthTokens()
            res.status(200).send({admin,token})
        }else{
            res.status(200).send({Error:true})
        }
    }catch(e){
        res.status(500).send({Error:true})
    }
    // console.log(req.body)
    // res.status(200).send({Error:true})
})
router.get('/admin/logout',adminAuth,async(req,res)=>{
    try{
        req.admin.tokens=req.tokens.filter((token)=>{token!==req.token})
        req.token=undefined
        await req.admin.save()
        res.status(200).send({suc:true})
    }catch(e){
        res.status(200).send({suc:true})
    }
})
module.exports=router