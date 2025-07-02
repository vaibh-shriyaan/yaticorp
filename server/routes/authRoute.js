//Vaibhav K
//Auth routes to handle the user Registration from Yaticorp.

const express=require('express');
const router=express.Router();
const {addSalesRep,resetPass,getUserById,loginController,addDealer, verifyController}=require('../controllers/authController')

router.post('/user',getUserById);              //Forwarded to getUserById controller.(For verification of web login & forward to learnyst)

router.post('/sales-rep',addSalesRep);        //Forwarded to addSalesRep controller. (To add new employees)

router.post('/dealer',addDealer);            //Forwarded to addDealer controller. (To add new dealers)

router.patch('/reset',resetPass);             //Forwarded to resetPass controllers.(To reset password)

router.post('/login',loginController);         //Login route

router.post('/verify',verifyController)         //Verify the OTPs
module.exports=router;