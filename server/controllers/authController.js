//Vaibhav K
//Auth Controller

const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const Learnyst_data = require("../modals/LearnystModal");
const sales_rep = require("../modals/SalesRep");
const User_data = require("../modals/CustModal");

exports.getUserById = async (req, res) => {
  try {
    const user = await User_data.findOne({
      CardNumber: Number(req.params.CardNumber),
    });

    if (!user)
      return res.status(404).json({
        success: false,
        error: "Card Number not found",
      });
    // const cardNumber=data.map(d=>d.CardNumber);

    const learnystData = {
      email: `${user.CardNumber}@yaticorp.com`,
      password: user.Verification_value,
      name: user.Name,
      Mobile: `+91${user.Phone}`,
      api_key: process.env.LEARNYST_API_KEY,
      api_secret: process.env.LEARNYST_API_SECRET,
    };
    let LearnRes;
    try {
      LearnRes = await axios.post(
        "https://sso.learnyst.com/signup",
        learnystData
      );
    } catch (LearnErr) {
      return res.status(502).json({                                             //502 code is returned by proxy server ,here learnyst
        success: false,
        message: "User sync with learnyst failed",
        error: LearnErr.response?.data || LearnErr.message,
      });
    }
    if (LearnRes) {
      const user_copy = new Learnyst_data(learnystData);
      await user_copy.save();
    }
    res.status(200).json({
      success: true,
      message: "Users synced to Learnyst",
      learnystResposne: LearnRes.data,
      userData: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

//route to create sales rep(add validation to check AIRRID later)
exports.addSalesRep = async (req, res) => {
  try {
    const user = await new sales_rep(req.body);
    await user.save();
    return res.status(201).json({
      succcess: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server erorr",
    });
  }
};

//API controller to reset password.
exports.resetPass = async (req, res) => {
  try {
    const user = await User_data.findOne({ CardNumber: req.body.CardNumber });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "CardNumber not found",
      });
    }
   
      await User_data.findOneAndUpdate(
        { CardNumber: req.body.CardNumber },
        { $set: { Verification_value: req.body.NewPass } },
        { upsert: false }
      );
      await Learnyst_data.findOneAndUpdate(
        { email: `${req.body.CardNumber}@yaticorp.com`},
        { $set: { password: req.body.NewPass } },
        { upsert: false }
      );

      return res.status(204).json({
        success: true,
        message: "Password Updated successfully!",
      });
   
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.data?.message || "Internal Server error!",
    });
  }
};
