const mongoose = require('mongoose');

// Schema for Dealers data
const dealer_Schema = mongoose.Schema({
  DD_ID: {
    type: String,
    required: true,
    unique: true,
  },
  DD_Name: {
    type: String,
    required: true,
  },
  DD_Phone: {
    type: Number,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
  },
  purchased: { type: Number },
  sold: { type: Number },
  available: { type: Number },
  reps: [{ type: mongoose.Schema.Types.ObjectId, ref: "sales_reps" }],
}, { timestamps: true });


// Post-update hook: Recalculate "available = purchased - sold"
// dealer_Schema.post('findOneAndUpdate', async function (doc,next) {
//   if (doc) {
//     doc.available = doc.purchased - doc.sold;
//     await doc.save(); 
//     next();
//   }
// }); 


const dealers = mongoose.model("dealers", dealer_Schema);
module.exports = dealers;
