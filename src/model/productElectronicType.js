const mongoose=require('mongoose')
const ProductTypeSchema=new mongoose.Schema({
    productElectronicType:{
        type:String,
        required:true,
        trim:true
    },
    productElectronicSubTypes:[{
        productSubType:{
            type:String,
            required:true
        }
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
const ProductType=mongoose.model('ProductElectronicType',ProductTypeSchema)
module.exports=ProductType