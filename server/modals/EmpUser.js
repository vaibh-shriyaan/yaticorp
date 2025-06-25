const mongoose = require("mongoose");

//schema for emp-customer data
const emp_Schema = mongoose.Schema(
  {
    user_name: {
      type: String,
    },
    user_phone: {
      type: Number,
    },
    SerialNumber: {
      type: Number,
      unique:true,
    },
    AIRR_ID: {
      type: Number,
    },
    AIRR_Name: {
      type: String,
    },
    AIRR_Phone: {
      type: Number,
    },
    payment_status: {
      type: String,
      default:null
    },
    CVV: {
      type: Number,      
      
      default:null
    },
    CardNumber: {
      type: Number,
      default:null
    },
  },
  { timestamp: true }
);

const emp_ToUser = mongoose.model("emp_ToUser", emp_Schema);
module.exports = emp_ToUser;
