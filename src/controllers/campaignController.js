 const campaignModel=require('../models/campaignModel')
 const userModel=require('../models/userModel')
 const validate = require('../validators/validations')
 const validUrl = require('valid-url')
 const createCampaign=async (req,res)=>{
try{

    let data=req.body
    if(!validate.isValidBody(data)){
        return res.status(400).send({status:false,message:"Please Enter Data"})
    }
    let{userId,shortToken,campaignName,offer,enabled}=data

    if(!userId){
        return res.status(400).send({status:false,message:"Enter User Name"})
    }
    if (!validate.isValidObjectId(userId)) {
        return res.status(400).send({ status: false, msg: "userId is Not Valid type of ObjectId" });
      }

   let findUser =await userModel.findById(userId)

   if(!findUser){
    return res.status(404).send({ status: false, msg: "user not found" });
   }
   if(!shortToken){
    return res.status(400).send({status:false,message:"Enter shortToken"})
}

if(!validate.isValidString(shortToken)){
    return res.status(400).send({status:false,message:"Enter valid shortToken"})
}

let uniqueShortToken =await campaignModel.findOne({shortToken:shortToken})

if(uniqueShortToken){
    return res.status(400).send({ status: false, message: `${data.shortToken} This shortToken is  Already Exist.Please,Give Another shortToken` })
}

if(!campaignName){
    return res.status(400).send({status:false,message:"Enter campaignName"})
}

if(!validate.isValidString(campaignName)){
    return res.status(400).send({status:false,message:"Enter valid campaignName"})
}

if(!offer.offerUrl){
    return res.status(400).send({status:false,message:"Enter offerUrl"})
}
if (!validUrl.isUri(offer.offerUrl)) {
     return res.status(400).send({ status: false, message: 'Please provide a valid offer.offerUrl' }) }


if(!offer.ratioPercentage){
    return res.status(400).send({status:false,message:"Enter ratioPercentage"})
}
if(!validate.isNumber(offer.ratioPercentage)){
    return res.status(400).send({status:false,message:"Enter number"})
}

if(enabled){
    if(typeof enabled !="boolean"){
        return res.status(400).send({ status: false, message: "Invalid Format of enabled it  must be true or false" });  
    } 
}

 
 if(req.session.userId!=data.userId){
    return res.status(401).send({ status: false, msg: "Sorry,You cannot access" });
 }  
/*  console.log(typeof req.session.userId)
    console.log(typeof data) 
 */
const createCampaignData =await campaignModel.create(data)
        return res.status(201).send({status:true,message:"Campaign created successfully",data:createCampaignData})


}
catch (error) {
    return res.status(500).send({ status: false, error: error.message })
}
 }
 //-------------------------------------------//

 const getCamapign =async (req,res)=>{
    try{

        const shortToken=req.query.shortToken

        const filter ={
            enabled:true
        }
        /* if(!shortToken){
            return res.status(400).send({status:false,message:"Enter shortToken"})
        } */
        if(shortToken){
           filter.shortToken=shortToken
        }
        let findShortToken = await campaignModel.find(filter)

        if(findShortToken.length===0){
            return   res.status(404).send({status:false,message:"shortToken not found May be campaign not enabled now"})
        }
        return res.status(200).send({status:true,count:findShortToken.length,list:findShortToken})

    }
    catch(error){
        return res.status(500).send({ status: false, error: error.message })  
    }
 }
//-----------------------------------------//

const updateCampaign =async (req,res)=>{
    try{
let id=req.params.id
let userId =req.body.userId

if(!validate.isValidObjectId(id)){
    return res.status(400).send({ status: false, message: "id is Not Valid" });
}

let campaignDetails= await campaignModel.findOne({_id:id})
if(!campaignDetails){
    return res.status(404).send({ status: false, message: "No campaign found this Id" })
}

    if(typeof req.body.enabled !="boolean"){
        return res.status(400).send({ status: false, message: "Invalid Format of enabled it  must be true or false" });  
    } 
  
let updateCampaignData = await campaignModel.findOneAndUpdate({_id:id},{enabled:req.body.enabled},{new:true}) 
console.log(typeof updateCampaignData.userId)
console.log(updateCampaignData.userId)

 
 

return res.status(200).send({ status: true, message:"Success", data: updateCampaignData,session:req.session})
    }
    catch(error){
        return res.status(500).send({ status: false, error: error.message })  
    }
}


 module.exports={createCampaign,getCamapign,updateCampaign}