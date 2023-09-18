const mongoose=require('mongoose')
const ProductTypeSchema=new mongoose.Schema({
    productType:{
        type:String,
        required:true,
        trim:true
    },
    productSubTypes:[{
        productSubType:{
            type:String,
            required:true
        }
    }],
    productBrands:[{
        productSubTypeId:mongoose.Schema.Types.ObjectId,
        productBrandNames:[{
            productBrandName:{
                type:String
            }
        }]
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:"AdminEntry"
    },
    updatedBy:[{
        adminId:{
            type:mongoose.Schema.Types.ObjectId,
            trim:true,
            ref:"AdminEntry"
        }
    }]
})
const ProductType=mongoose.model('ProductType',ProductTypeSchema)
module.exports=ProductType