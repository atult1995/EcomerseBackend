const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please provide correct email..!")
            }
        }

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password should not contain "password" or "Password"')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            trim:true
        }
    }],
    address:[{
        address:{
            type:String,
            trim:true
        },
        city:{
            type:String,
            trim:true
        },
        state:{
            type:String,
            trim:true
        },
        pincode:{
            type:Number,
            trim:true
        }
    }],
    avatar:{
       type:Buffer
    }
},{
    timestamps:true
})

UserSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcryptjs.hash(user.password,8)
    }
    next()
})

UserSchema.statics.findByCredantial=async (email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("There is no such user..!")
    }
    const isMatch=await bcryptjs.compare(password,user.password)
    console.log(password,isMatch)
    if(!isMatch){
        throw new Error("There is no such user..!")
    }
    return user
}

UserSchema.methods.generateAuthTokens=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'thisismykey',{expiresIn:"7 days"})
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

const User=mongoose.model('User',UserSchema)
module.exports=User