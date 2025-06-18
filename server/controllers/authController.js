const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const Learnyst_data = require("../modals/LearnystModal");

exports.getUserById = async (req, res) => {
  try {
    const user = await mongoose.connection.db
      .collection("Form_data")
      .findOne({ CardNumber: Number(req.params.CardNumber) });
    if (!user)
      return res
        .status(404)
        .json({
          success: false,
          error: error.message || "Card Number not found",
        });
    // const cardNumber=data.map(d=>d.CardNumber);

    const learnystData = {
      email: `${user.CardNumber}@yaticorp.com`,
      password: user.Verification_value,
      name:user.Name,
      Mobile:`+91${user.Phone}`,
      api_key: process.env.LEARNYST_API_KEY,
      api_secret: process.env.LEARNYST_API_SECRET
    };
    let LearnRes;
    try{
     LearnRes = await axios.post(
       "https://sso.learnyst.com/signup",learnystData
   );
  }catch(LearnErr){
    return res.status(502).json({
      success:false,
      message:"User sync with learnyst failed",
      error:LearnErr.response?.data || LearnErr.message, 
    })

  }
   
    const user_copy = new Learnyst_data(learnystData);
    await user_copy.save();

    res.status(200).json({
      success:true,
      message:"Users synced to Learnyst",
      learnystResposne:LearnRes.data,
      userData:user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};
