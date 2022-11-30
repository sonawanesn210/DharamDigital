const validate=require('../validators/validations')
const campaignModel=require('../models/campaignModel')

const userModel=require('../models/userModel')

  //............................................MIDDLEWARE-FOR AUTHORIZATION..........................................................
  
  
  const authorization = async function (req, res, next) {
    try {
      const id = req.params.id;
      let userId =req.body.userId
      if (id) {
      
        if (!validate.isValidObjectId(id)) {
          return res.status(400).send({ status: false, msg: "Id is Not Valid type of ObjectId" });
        }
      }
      if(!userId){
        return res.status(400).send({ status: false, message: "enter userId" });
    }
    if(!validate.isValidObjectId(userId)){
        return res.status(400).send({ status: false, message: "id is Not Valid" });
    }
    let user =await userModel.findById(userId)
    if(!user){
        return res.status(404).send({ status: false, message: "No user found with this Id" })  
    }
      const findCampaign = await campaignModel.findById(id)
      console.log(findCampaign)
      if (!findCampaign) {
        return res.status(400).send({ status: false, msg: "Incorrect Id" });
      }
   
     if(req.body.userId!=findCampaign.userId){
        return res.status(401).send({ status: false, msg: "Sorry,You cannot access" });
     }
      next(); //if match then move the execution to next
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  };
  
  
  module.exports = {authorization}

  
 /*  const authorization = async function (req, res, next) {
    try {
         let setCookie = req.headers['cookie'] 
   
     
       const id = req.params.id;
       let userId =req.body.userId
       if (id) {
       
         if (!validate.isValidObjectId(id)) {
           return res.status(400).send({ status: false, msg: "Id is Not Valid type of ObjectId" });
         }
       }
    
     if(!validate.isValidObjectId(userId)){
         return res.status(400).send({ status: false, message: "id is Not Valid" });
     }
     let user =await userModel.findOne({_id:userId})
     if(!user){
         return res.status(404).send({ status: false, message: "No user found with this Id" })  
     } 
       const findCampaign = await campaignModel.findById(id)
       console.log(findCampaign)
       if (!findCampaign) {
         return res.status(400).send({ status: false, msg: "Incorrect Id" });
       }
    
      if(req.params.userId!=findCampaign.userId){
         return res.status(401).send({ status: false, msg: "Sorry,You cannot access" });
      }
       next(); //if match then move the execution to next
     }  catch (err) {
       res.status(500).send({ status: false, error: err.message });
     }
   };  */
   
   