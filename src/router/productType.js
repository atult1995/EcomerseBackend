const express=require('express')
const router=express.Router()
const ProductType=require('../model/productType')
const {ObjectId}=require('mongodb')
const adminAuth=require('../middleware/adminAuth')
router.post('/productType',adminAuth,async(req,res)=>{
    try{
        const productType=new ProductType()
        productType.productType=req.body.productType
        productType.productSubTypes=req.body.productSubTypes
        productType.createdBy=req.admin._id.toString()
        await productType.save()
        res.status(201).send({"suc":"hi","status":"201"})
    }catch(e){
        res.status(500).send({"error":e,"status":"500"})
    }
    //console.log(req.body)
})
router.get("/productType",adminAuth,async(req,res)=>{
    try{
        const productType=await ProductType.find()
        res.status(200).send(productType)
    }catch(e){
        res.send({Error:e})
    }
})
router.get("/productSubTypes/:id",adminAuth,async(req,res)=>{
    try{
        const product=await ProductType.findById(req.params.id)
        //console.log(product.productSubTypes)
        res.send({productSubTypes:product.productSubTypes})
    }
    catch(e){
        res.send({Error:e})
    }
})
// router.post('/productBrand',adminAuth,async(req,res)=>{
//     try{
//         const productType=await ProductType.findById(req.body.productTypeId)
//         const productBrand={
//             "productSubTypeId":req.body.productSubTypeId,
//             "productBrandNames":req.body.productBrandNames
//         }
//         productType.productBrands.push(productBrand)
//         productType.updatedBy.push(req.admin._id.toString())
//         await productType.save()
//         res.status(201).send({suc:true})
//     }catch(e){
//         res.status(500).send({"error":e})
//     }
    
// })
router.get('/productBrands/:productTypeId/:productSubTypeId',adminAuth,async(req,res)=>{
    try{
        const productType=await ProductType.findById(req.params.productTypeId)
        const productSubTypeId=req.params.productSubTypeId
        productType.productBrands.forEach(element => {
            if(element.productSubTypeId.toString()===productSubTypeId){
                res.send({productBrandNames:element})
            }
        });
    }catch(e){
        res.send({error:e})
    }
})
module.exports=router