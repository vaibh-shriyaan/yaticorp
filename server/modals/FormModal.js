const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Course_Name: String,
  Course_id: Number,
  Phone: Number,
  Amount_paid: Number,
  Access_type: String,
  Verification_value: String,
  CVV: Number,
  CardNumber: Number
});

const Form_data = mongoose.model("Form_data", FormSchema);
module.exports = Form_data;
