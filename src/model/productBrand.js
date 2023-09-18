const mongoose=require('mongoose')

const ProductBrandSchema=new mongoose.Schema({
    productBrandName:{
        type:String,
        required:true,
        trim:true
    }
})

const ProductBrand=mongoose.model('ProductBrand',ProductBrandSchema)
module.exports=ProductBrand