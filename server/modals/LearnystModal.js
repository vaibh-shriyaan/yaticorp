const mongoose =require('mongoose');


// Schema
const Learnyst_Schema = new mongoose.Schema({
 email:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true,
 },
 Mobile:{
   type:Number,
   required:true,
 },
 name:{
   type:String,
    required:true,
 }
});

const Learnyst_data = mongoose.model("Learnyst_data", Learnyst_Schema);
module.exports=Learnyst_data;