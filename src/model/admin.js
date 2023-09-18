const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const AdminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Provide correct Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password should not contain "password" or "Password"')
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        trim:true
    },
    // address:[{
    //     address:{
    //         type:String,
    //         required:true,
    //         trim:true
    //     },
    //     city:{
    //         type:String,
    //         required:true,
    //         trim:true
    //     },
    //     pincode:{
    //         type:Number,
    //         requred:true,
    //         trim:true
    //     },
    //     state:{
    //         type:String,
    //         required:true,
    //         trim:true
    //     },
    //     country:{
    //         type:String,
    //         requred:true,
    //         trim:true
    //     },
    //     addressType:{
    //         type:String,
    //         required:true,
    //         trim:true
            
    //     }
        
    // }],
    tokens:[{
        token:{
            type:String,
            trim:true
        }
    }]
},{
    timestamps:true
})
AdminSchema.pre('save',async function(next){
    const admin=this
    if(admin.isModified('password')){
        admin.password=await bcrypt.hash(admin.password,8)
    }
    next()
})

AdminSchema.statics.findByCredentials=async(email,password)=>{
    const admin=await Admin.findOne({email})
    if(admin===null){
        return false
    }
    const isMatch=await bcrypt.compare(password,admin.password)
    if(!isMatch){
        return false
    }
    return admin
}
AdminSchema.methods.generateAuthTokens=async function(){
    const admin=this
    const token=jwt.sign({_id:admin._id.toString()},'thisismykey',{expiresIn:"7 days"})
    admin.tokens=admin.tokens.concat({token})
    await admin.save()
    return token
}
AdminSchema.methods.toJSON=function(){
    const admin=this
    const adminObject=admin.toObject()
    delete adminObject.password
    delete adminObject.tokens
    return adminObject
}

const Admin=mongoose.model('AdminEntry',AdminSchema)
module.exports=Admin