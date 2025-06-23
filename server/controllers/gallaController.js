//Vaibhav K
//GallaBox Controller API

const sales_rep=require('../modals/SalesRep')
const User_data=require('../modals/CustModal')
const card_details=require('../modals/verifyModal')
const emp_ToUser=require('../modals/EmpUser')

exports.saveUserChats=async(req,res)=>{
    
    const gallaData={
        ...req.body,
        Phone:Number(req.body.Phone),
        CardNumber:Number(req.body.CardNumber),
    }
try{
    const newUser=new User_data(gallaData);
    await newUser.save();
 
  
    
    //let updated_sales;
    // if(newUser){
    //     updated_sales=await sales_rep.findOneAndUpdate(
    //         {AIRR_ID:gallaData.AIRR_ID},
    //         {$push:{users:newUser._id}},
    //         {new:true,upsert:false}                   //new:true returns updated document,upsert:false disables creating new doc if no match found.
    //     )                                             //populate('users'); use this to fetch users under him/her
    
    // }
   

    res.status(200).json({
        success:true,
        message:"Data saved successfully",
       //data:users,
       // linked_users:updated_sales        Here the users array is returned and can be fetched for further admin panel 
                                         // requirements(to fetch sales_rep->user)
    })

}catch(err){
    res.status(500).json({
        success:false,
        message:err.data?.message||"Internal server error",
        error:err.message
    })
}
};

exports.getCardDetails=async(req,res)=>{
    try{
    const card=await  card_details.findOne({SerialNumber:req.body.SerialNumber})
    if(!card){
        return res.status(404).json({
            success:false,
            message:"Card Number not found."
        })
    }
        return res.status(200).json({
            success:true,
            message:"Card details fetched sucessfully!",
            details:card
        })
    
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.data?.message||"Error fetching details",
            error:err.message
        })
    }

}

exports.getRepDetails=async(req,res)=>{
    try{
    const user=await  sales_rep.findOne({AIRR_Phone:req.body.phone})
    if(!user){
       return res.status(404).json({
            success:false,
            message:"Employee not found."
        })
    }
        return res.status(200).json({
            success:true,
            message:"Employee Data fetched sucessfully!",
            Emp:user
        })
    
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.data?.message||"Error fetching details",
            error:err.message
        })
    }

}


exports.addEmpToUser=async(req,res)=>{
    const data={
        ...req.body,
        SerialNumber:Number(req.body.SerialNumber),
        AIRR_ID:Number(req.body.AIRR_ID),
        AIRR_Phone:Number(req.body.AIRR_Phone),
        user_phone:Number(req.body.user_phone),
    }
    try{
    const user=await new emp_ToUser(data)
    await user.save();
    const users=await  emp_ToUser.find({AIRR_ID:data.AIRR_ID})
    if(!user){
       return res.status(400).json({
            success:false,
            message:"Records not updated"
        })
    }
    const total_sales=users.length;                   //here we update the total sales based on users under him/her. 

    await sales_rep.findOneAndUpdate(
        {AIRR_ID:data.AIRR_ID},
        {$set:{'Total_sales':total_sales}},
        {new:true,upsert:false}

    )
       return res.status(204).json({
            success:true,
            message:"Employee Data added successfully!",
        })
    
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.data?.message||"Internal server error",
            error:err.message
        })
    }

}


exports.updateEmp=async(req,res)=>{
        const data={
            ...req.body,
            SerialNumber:Number(req.body.SerialNumber),
            
        }
    try{
        if(req.body.CardNumber && req.body.CVV!==undefined){

            data.CardNumber=Number(req.body.CardNumber),
            data.CVV=Number(req.body.CVV)
        }
   const user= await emp_ToUser.findOneAndUpdate(
        {SerialNumber:data.SerialNumber},
        {$set:{'CardNumber':data.CardNumber,'CVV':data.CVV,'payment_status':data.payment_status}},
        {new:true,upsert:false}
    )
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
        return res.status(204).json({
            success:true,
            message:"Data synced successfully!",
        })
    
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.data?.message||"Error updating details",
            error:err.message
        })
    }

}

