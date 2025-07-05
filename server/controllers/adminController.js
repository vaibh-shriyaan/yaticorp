const Learnyst_data = require("../modals/LearnystModal");
const sales_rep = require("../modals/SalesRep");
const User_data = require("../modals/CustModal");
const dealerModal = require("../modals/DealerModal");

exports.fetchReps=async(req,res,next)=>{
    try{
        const users=await sales_rep.find();

        if(!users){
            return res.status(404).json({
                error:true,
                message:"No representatives found."
            })
            
        }
        return res.status(200).json({
            error:false,
            reps:users
        })

    }catch(err){
 return res.status(500).json({
        Error: true,
        message: err.message||"Internal Server error",
      });
    }
}

exports.fetchDealers=async(req,res,next)=>{
    try{
        const users=await dealerModal.find();

        if(!users){
            return res.status(404).json({
                error:true,
                message:"No Dealers found."
            })
            
        }
        return res.status(200).json({
            error:false,
            dealers:users
        })

    }catch(err){
 return res.status(500).json({
        Error: true,
        message: err.message||"Internal Server error",
      });
    }
}