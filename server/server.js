// server.js
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

//connect DB
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


app.use('/api/v1/auth',authRoute); 
app.use('/api/v1/users',chatRoute);

app.listen(process.env.PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT} in ${process.env.MODE}`);
});
