const express=require('express')
const router=express.Router()
const ProductBrand=require('../model/productBrand')
const { ObjectId } = require('mongodb');
router.post('/productBrand',async(req,res)=>{
    try{
        const productBrand=new ProductBrand(req.body)
        await productBrand.save()
        res.status(201).send({suc:true})
    }catch(e){
        res.status(500).send({"error":e})
    }
})
router.get('/productBrand',async(req,res)=>{
    try{
        const productBrand=await ProductBrand.find({})
        res.status(200).send(productBrand)
    }catch(e){
        res.status(500).send({"Error":e})
    }
})
router.get('/productBrand/:id',async(req,res)=>{
    //console.log(req.params.id)
    try{
        const productBrand=await ProductBrand.find({productTypeId:new ObjectId(req.params.id)})
        res.send(productBrand)
    }catch(e){
        res.status(500).send({"Error":e})
    }
})
module.exports=router