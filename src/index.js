const express=require('express')
const User=require('./model/user')
const userRouter=require('./router/user')
const productEntry=require('./router/product')
const productType=require('./router/productType')
const productBrand=require('./router/productBrand')
const Admin=require('./router/admin')
require('./db/mongoose')
const cors=require('cors')

const app=express()

const port=process.env.port || 4000
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(express.json())

//creating routes
app.use(userRouter)
app.use(productEntry)
app.use(productType)
app.use(productBrand)
app.use(Admin)

// const bcryptjs=require('bcryptjs')
// const myFunction=async()=>{
//     const password="atul123!"
//     const hashPassword=await bcryptjs.hash(password,8)
//     console.log(password,hashPassword)
//     const isMatch=await bcryptjs.compare(password,hashPassword)
//     console.log(isMatch)
// }
// myFunction()

// const jwt=require('jsonwebtoken')
// const myFunction=()=>{
//     const token=jwt.sign({_id:"atul123"},'thisismykey',{expiresIn:"7 days"})
//     console.log(token)
//     const data=jwt.verify(token,"thisismykey")
//     console.log(data)
// }
// myFunction()

app.listen(port,()=>{
    console.log("App is running at port",port)
})


