const mongoose=require('mongoose');


//schema for OTP modal
const otp_Schema=mongoose.Schema({
    CardNumber:{
        type:Number,
        required:true,
        match: /^[0-9]{10}$/
    },
    OTP:{
        type:Number,
        required:true
    }
},{timestamps:true})

const otp=mongoose.model("otp",otp_Schema);
module.exports=otp;