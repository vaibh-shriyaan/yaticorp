//Vaibhav k
//All Admin panel specific routes

const express=require('express');
const { fetchReps, fetchDealers } = require('../controllers/adminController');
const router=express.Router();

router.get('/reps',fetchReps);
router.get('/dealers',fetchDealers);

module.exports=router;