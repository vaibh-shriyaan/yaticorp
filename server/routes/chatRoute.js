//Vaibhav K
//Specifies all the routes related to user chats from whatsapp

const express=require('express');
const{saveUserChats,getCardDetails,getRepDetails,addEmpToUser,updateEmp}=require('../controllers/gallaController')

const router=express.Router();

router.post('/save-chats',saveUserChats);       //forwarded to saveUserChats Controller(saves user registration details).
router.post('/CardNumber',getCardDetails);      //forwarded to getCardDetails Controller(retrieves card info to verify card number)
router.post('/emp',getRepDetails);               //get sales rep details to verify user
router.post('/emp-user',addEmpToUser);          //adds data to emp-user 
router.patch('/update',updateEmp);              //adds CardNumber & CVV by fetching SerialNumber
module.exports=router;
