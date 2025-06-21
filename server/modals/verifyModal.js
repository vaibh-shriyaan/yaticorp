const mongoose=require('mongoose');


//schema for Card Data
const verify_Schema=mongoose.Schema({
    CardNumber:{
        type:Number,
        required:true,
        unique:true
    },
    CVV:{
        type:String,
        required:true
    },
    SerialNumber:{
        type:Number,
        required:true,
        unique:true
    },
})

const card_details=mongoose.model("card_details",verify_Schema);
module.exports=card_details;