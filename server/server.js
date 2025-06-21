// Vaibhav K
// This is the main server file to start the server(Contains all the Routes to be handled by the server.)
//All API routes are v1(version 1).

const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoute=require('./routes/authRoute')
const chatRoute=require('./routes/chatRoute')
const ConnectDB=require('./config/db');


const app = express();
app.use(cors());
app.use(express.json());

//connect to mongoDB(configs/db.js)
ConnectDB();

// Register user (similar to sheetBest POST)
// app.post('/api/register', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

//All the routes (specific to this server).

app.use('/api/v1/auth',authRoute); //Fetches user details & forwards the  same to Learnyst/signup

app.use('/api/v1/users',chatRoute); //POSt route to collect user details from GallaBox.




app.listen(process.env.PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT} in ${process.env.MODE}`);
});
