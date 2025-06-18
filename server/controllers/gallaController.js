const mongoose=require('mongoose');

exports.saveUserChats=async(req,res)=>{
    const gallaData=req.body;
try{
    await mongoose.connection.db.collection('Form_data')
    .insertOne(gallaData)
    res.status(200).json({
        success:true,
        message:"Data saved successfully",
        data:gallaData
    })

}catch(err){
    res.status(500).json({
        success:false,
        message:err.data?.message||"Internal server error",
        error:err.message
    })
}
};