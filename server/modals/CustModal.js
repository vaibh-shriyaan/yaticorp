const mongoose = require('mongoose');

const User_Schema = new mongoose.Schema({
  Name: {  type:String,required:true},
  Email: {  type:String,required:true,match: /.+\@.+\..+/},
  Course_Name: {  type:String,required:true},
  Course_id: {  type:Number,required:true},
  Phone: {  type:Number,required:true,unique:true,match: /^[0-9]{10}$/},
  Amount_paid: { type:Number,required:true},
  Access_type: {  type:String,required:true},
  Verification_value: {  type:String,required:true},
  CVV: { type:Number,required:true,unique:true},
  CardNumber:{ type:Number,required:true,unique:true},
  AIRR_ID:{  type:Number,required:true}
},{timestamps:true});

const User_data = mongoose.model("User_data",User_Schema);
module.exports = User_data;
