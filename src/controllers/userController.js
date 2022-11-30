const userModel = require('../models/userModel')
const validate = require('../validators/validations')
//const jwt =require('jsonwebtoken')
const createUser = async (req, res) => {
    try {

        let data = req.body
       
        
        if(!validate.isValidBody(data)){
            return res.status(400).send({status:false,message:"Please Enter Data"})
        }
        let{userName,email,password}=data
        if(!userName){
            return res.status(400).send({status:false,message:"Enter User Name"})
        }
        if(!validate.isValidString(userName)){
            return res.status(400).send({status:false,message:"Enter valid User Name"})
        }

        if(validate.isNumber(userName)){
            return res.status(400).send({status:false,message:"User Name should not contain number"})
        }

         
        if(!email){
            return res.status(400).send({status:false,message:"Please enter email"})
        }
        if(!validate.isValidEmail(email)){
            return res.status(400).send({status:false,message:"Please Enter valid email"})
        }

        let findEmail =await userModel.findOne({email:email})
        if(findEmail){
            return res.status(400).send({status:false,message:`${data.email} is already present ,enter another email`})
        }

        if(!password){
            return res.status(400).send({status:false,message:"Please Enter password"})
        }

        if(!validate.isValidPassword(password)){
            return res.status(400).send({status:false,message:"Password should have min 8 characters And max 13 characters with ateast one capital letter, one number and one special character"})
        }
      
        const createUserData =await userModel.create(data)
        return res.status(201).send({status:false,message:"User created successfully",data:createUserData})

    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

//--------------------------------------------------//
const loginUser =async (req,res)=>{
    try{
       let data=req.body

       if(!validate.isValidBody(data)){
        return res.status(400).send({status:false,message:"Please enter data"})
       }
    if(!data.userName){
        return res.status(400).send({status:false,message:"Please enter userName"})
    }
    if(!validate.isValidString(data.userName)){
        return res.status(400).send({status:false,message:"Enter valid userName"})
    }
    if(!data.password){
        return res.status(400).send({status:false,message:"please enter password"})
    }
    const findUserNamePassword=await userModel.findOne({userName:data.userName,password:data.password})
    if(!findUserNamePassword){
        return res.status(401).send({status:false,message:"Invalid Login credentials"})
    }
    req.session.userId=findUserNamePassword._id
    /* console.log(typeof req.session.userId)
    console.log(typeof findUserNamePassword._id) */
    res.status(200).send({status:true,message:"Login successfully"})


    }
    catch(error){
        res.status(500).send({status:false,error:error.message})
    }
}


module.exports = { createUser,loginUser }