const mongoose =require('mongoose')

const objectId = mongoose.Schema.Types.ObjectId

const campaignSchema=new mongoose.Schema({
    userId:{
        type:objectId,
        required:true,
        ref:"digiuser"
        
    },
    shortToken:{
        type:String,
        required:true,
        trim :true,
        unique:true
    },
    campaignName:{
        type:String,
        required:true,
        trim:true

    },
    offer:
        {
           offerUrl:{
            type:String,
            required:true,
           } ,
           ratioPercentage:{
            type:Number,
            required:true
           }
        }
,
    enabled:{

        type:Boolean,
        default:false
    }

})


module.exports = mongoose.model("campaign", campaignSchema);