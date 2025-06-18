const express=require('express');
const{saveUserChats}=require('../controllers/gallaController')

const router=express.Router();

router.post('/save-chats',saveUserChats);

module.exports=router;