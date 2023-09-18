const ProductElectronicType=require('../model/productElectronicType')
const auth=require('../middleware/adminAuth')
const express=require('express')
const router=express.Router()
router.post('/productElectronicType',auth,async(req,res)=>{
    try{
        const productElectronicType=new ProductElectronicType()
        productElectronicType.productType=req.body.productType
        productElectronicType.productSubTypes=req.body.productSubTypes
        productElectronicType.createdBy=req.admin._id.toString()
        await productElectronicType.save()
        res.status(201).send({suc:true})
    }catch(e){
        res.status(201).send({error:true})
    }
    
})