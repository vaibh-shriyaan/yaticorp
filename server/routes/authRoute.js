//Vaibhav K
//Auth routes to handle the user Registration from Yaticorp.

const express=require('express');
const router=express.Router();
const {addSalesRep,resetPass,getUserById}=require('../controllers/authController')

router.get('/user/:CardNumber',getUserById);  //Forwarded to getUserById controller.(For verification of web login & forward to learnyst)

router.post('/sales-rep',addSalesRep);   //Forwarded to addSalesRep controller. (To add new employees)

router.patch('/reset',resetPass);           //Forwarded to resetPass controllers.(To reset password)
module.exports=router;