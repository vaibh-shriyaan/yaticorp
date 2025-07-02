//Vaibhav K
//GallaBox Controller API

const sales_rep = require("../modals/SalesRep");
const User_data = require("../modals/CustModal");
const card_details = require("../modals/verifyModal");
const emp_ToUser = require("../modals/EmpUser");
const dealers = require("../modals/DealerModal");
const otp = require("../modals/otpModal");

exports.saveUserChats = async (req, res) => {
  const gallaData = {
    ...req.body,
    Phone: Number(req.body.Phone),
    CardNumber: Number(req.body.CardNumber),
  };
  try {
    const newUser = new User_data(gallaData);
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
      success: true,
      message: "Data saved successfully",
      //data:users,
      // linked_users:updated_sales        Here the users array is returned and can be fetched for further admin panel
      // requirements(to fetch sales_rep->user)
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.data?.message || "Internal server error",
      error: err.message,
    });
  }
};

exports.getCardDetails = async (req, res) => {
  try {
    const card = await card_details.findOne({
      SerialNumber: req.body.SerialNumber,
    });
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card Number not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Card details fetched sucessfully!",
      details: card,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.data?.message || "Error fetching details",
      error: err.message,
    });
  }
};

exports.getRepDetails = async (req, res) => {
  try {
    const user = await sales_rep.findOne({ AIRR_Phone: req.body.phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee Data fetched sucessfully!",
      Emp: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.data?.message || "Error fetching details",
      error: err.message,
    });
  }
};

exports.addEmpToUser = async (req, res) => {
  const data = {
    ...req.body,
    SerialNumber: Number(req.body.SerialNumber),
    AIRR_ID: Number(req.body.AIRR_ID),
    AIRR_Phone: Number(req.body.AIRR_Phone),
    user_phone: Number(req.body.user_phone),
  };
  try {
    const user = await new emp_ToUser(data);
    await user.save();

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Records not updated",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee Data added successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.data?.message || "Internal server error",
      error: err.message,
    });
  }
};

exports.updateEmp = async (req, res) => {
  try {
    //To fetch user using phone number
    if (req.body.phone) {
      const emp = await emp_ToUser.findOne({
        user_phone: Number(req.body.phone),
      });

      if (!emp) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Data fetched successfully!",
        data: emp,
      });
    }

    //To update CardNumber & CVV
    if (req.body.CardNumber && req.body.CVV !== undefined) {
      CardNumber = Number(req.body.CardNumber);

      const user = await emp_ToUser.findOneAndUpdate(
        { SerialNumber: Number(req.body.SerialNumber) },
        {
          $set: {
            CardNumber: CardNumber,
            CVV: req.body.CVV,
          },
        },
        { new: true, upsert: false }
      );
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Records not found!",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Card details updated!.",
      });
    }

    //If payment is updated,sales is updated
    if (req.body.payment_status === "paid") {
      const update = await emp_ToUser.findOneAndUpdate(
        { SerialNumber: req.body.SerialNumber },
        {
          $set: {
            payment_status: req.body.payment_status,
          },
        },
        { new: true, upsert: false }
      );
      if (update) {
        const users = await emp_ToUser.find({ AIRR_ID: update.AIRR_ID });
        const total_sales = users.length;
       const newDoc= await sales_rep.findOneAndUpdate(
          { AIRR_ID: update.AIRR_ID },
          { $set: { Total_sales: total_sales } },
          { new: true, upsert: false }
        );
        const result = await sales_rep.aggregate([
          { $match: { DDID: newDoc.DDID } },
          {
            $group: {
              _id: null,
              sold: { $sum: '$Total_sales' },
            },
          },
        ]);
        const dealer=await dealers.findOneAndUpdate(
          {DD_ID:newDoc.DDID},
          {$set:{sold:result[0]?.sold}},
          {new:true,upsert:false}
        )
        dealer.available=dealer.purchased-dealer.sold;
        await dealer.save();
        return res.status(200).json({
          success: true,
          message: "Records updated.",
        });
      }

      return res.status(404).json({
        success: false,
        message: "Records not found!",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Field not allowed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.data?.message || "Error updating details",
      error: err.message,
    });
  }
};


//To fetch dealer details
exports.getDealer = async (req, res) => {
  try {
    const user = await dealers.findOne({ DD_ID: req.body.DD_ID });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Dealer Data fetched sucessfully!",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.data?.message || "Error fetching details",
      error: err.message,
    });
  }
};

//To store generated OTP
exports.sendOtp = async (req, res) => {
  const verify_token={
    CardNumber:Number(req.body.CardNumber),
    OTP:Number(req.body.OTP)
  }
  try {
    const token = new otp(verify_token);
    token.save();
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "OTP not received!.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "OTP saved!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.data?.message || "Internal server error.",
      error: err.message,
    });
  }
};

