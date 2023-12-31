const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true
    },
    productSubTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:'ProductType'
    },
    productBrandId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:'ProductType'
    }
    ,
    productQuantity:{
        type:Number,
        required:true,
        trim:true
    },
    productSpecification:[{
        os:{
            type:String,
            trim:true,
            required:true
        },
        screenSize:{
            type:String,
            trim:true,
            required:true
        },
        Dimension:{
            type:String,
            trim:true,
            required:true
        },
        weight:{
            type:String,
            trim:true,
            required:true
        },
        colour:[{
            type:String,
            trim:true,
            required:true
        }],
        camera:{
            type:String,
            trim:true
        },
        battery:{
            type:Number,
            trim:true
        },
        processor:{
            type:String,
            trim:true,
            required:true
        },
        storage:[{
            type:String,
            trim:true,
            required:true
        }],
        ram:[{
            type:String,
            trim:true,
            required:true
        }],
        wifi:{
            type:String,
            trim:true,
            required:true
        },
        bluetooth:{
            type:String,
            trim:true,
            required:true
        },
        other:{
            type:String,
            trim:true,
            required:true
        }
    }],
    productImages:[{
        type:Buffer
    }],
    productPrice:{
        type:String,
        trim:true,
        required:true
    },
    productDiscount:{
        type:String,
        trim:true,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:"AdminEntry"
    },
    updatedBy:[{
        adminId:{
            type:mongoose.Schema.Types.ObjectId
        },
        comment:{
            type:String,
            trim:true,
            required:true
        }
    }]
})

const Product=mongoose.model('ProductElectronic',ProductSchema)
module.exports=Product
