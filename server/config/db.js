const mongoose = require('mongoose');

const ConnectDB =async()=>{
    try{
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected");
  
}catch(err){
    console.log("Error connecting to MongoDB:",err.message);
}
}
module.exports=ConnectDB;
