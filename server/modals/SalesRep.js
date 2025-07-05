const mongoose=require('mongoose');

//schema for sales reps data
const sales_Schema=mongoose.Schema({
    AIRR_ID:{
        type:Number,
        required:true,
        unique:true
    },
    AIRR_Name:{
        type:String,
        required:true
    },
    AIRR_Phone:{
        type:Number,
        required:true,
        unique:true
    },
    Total_sales:{type:Number},
    DDID:{type:String,required:true},
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"User_data"}]
},{timestamps:true})

const sales_rep=mongoose.model("sales_rep",sales_Schema);
module.exports=sales_rep;