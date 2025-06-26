//Vaibhav K
//Middleware to authorize API headers

require('dotenv').config()
module.exports=function(req,res,next){
 const apiKey=req.headers['x-api-key'];
 const apiSecret=req.headers['x-api-secret'];

 if(
    apiKey===process.env.API_KEY && apiSecret===process.env.API_SECRET
 ){
   return next();
 }
 return res.status(401).json({message:'Unauthorized:Invalid API credentials'})
}