const express=require('express')
const router=express.Router()
const Product=require('../model/product')
const multer=require('multer')
const sharp=require('sharp')
const adminAuth=require('../middleware/adminAuth')

const upload=multer({
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            cb("error",false)
        }
        cb(undefined,true)
    }
})
router.post("/productEntry",adminAuth,upload.array('productImages',2),async(req,res)=>{
    try{
        // const buffer=await sharp(req.file.buffer).resize({width:500,height:500}).png().toBuffer()
        const product=new Product()
        const buffer1=await sharp(req.files[0].buffer).resize({width:250,height:250}).png().toBuffer()
        product.productImages.push(buffer1)
        const buffer2=await sharp(req.files[1].buffer).resize({width:250,height:250}).png().toBuffer()
        product.productImages.push(buffer2)
        product.productName=req.body.productName,
        product.productTypeId=req.body.productTypeId,
        product.productSubTypeId=req.body.productSubTypeId
        product.productBrandId=req.body.productBrandId,
        product.productQuantity=req.body.productQuantity,
        product.productDescription=req.body.productDescription,
        product.productSizes=JSON.parse(req.body.productSizes),
        product.createdBy=req.admin._id.toString()
        await product.save()
        res.send({suc:true})
    }catch(e){
        res.send({suc:e})
    }   
})

// router.post("/productImageEntry",upload.single('productImage'),async(req,res)=>{
//     const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
//     const product=await Product.findById("61f2259a8e140a7fff99b7ee")
//     product.productImage=buffer
//     await product.save()
//     res.send({suc:true})
//     console.log(req.body)
   
// })
router.post("/productImageEntry",upload.array('productImages'),async(req,res)=>{
    const product=await Product.findById("61f5e2b8efdf273c775970f9")
    const buffer1=await sharp(req.files[0].buffer).resize({width:250,height:250}).png().toBuffer()
    product.productImages.push(buffer1)
    const buffer2=await sharp(req.files[1].buffer).resize({width:250,height:250}).png().toBuffer()
    product.productImages.push(buffer2)
    await product.save()
    res.send({suc:true})
    //console.log(req.files)
    //console.log(req.files[1])
    //console.log(req.files[0])
    //console.log(buffer)
})
// router.get("/productImage",async(req,res)=>{
//     const product=await Product.findById("61f2259a8e140a7fff99b7ee")
//     res.set('Content-Type','image/jpg')
//     res.send(product.productImage)
// })

module.exports=router


