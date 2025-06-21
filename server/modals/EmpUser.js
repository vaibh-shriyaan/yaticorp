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
    },
    AIRR_ID: {
      type: Number,
      unique: true,
    },
    AIRR_Name: {
      type: String,
    },
    AIRR_Phone: {
      type: Number,
      unique: true,
    },
    payment_status: {
      type: String,
    },
    CVV: {
      type: Number,
    },
    CardNumber: {
      type: Number,
      unique: true,
    },
  },
  { timestamp: true }
);

const emp_ToUser = mongoose.model("emp_ToUser", emp_Schema);
module.exports = emp_ToUser;
