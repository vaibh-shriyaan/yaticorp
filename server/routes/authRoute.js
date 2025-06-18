const express=require('express');
const router=express.Router();
const {getUserById}=require('../controllers/authController')

router.get('/user/:CardNumber',getUserById);

module.exports=router;