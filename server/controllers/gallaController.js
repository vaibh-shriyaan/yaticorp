const mongoose=require('mongoose');

exports.saveUserChats=async(req,res)=>{
    const Phone=req.body.Phone
    const CardNumber=req.body.CardNumber
    const gallaData={
        ...req.body,
        Phone:Number(req.body.Phone),
        CardNumber:Number(req.body.CardNumber)
    }
try{
    await mongoose.connection.db.collection('Form_data')
    .insertOne(gallaData,{Phone:Number(Phone)},{CardNumber:Number(CardNumber)})
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