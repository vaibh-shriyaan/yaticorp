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
const apiAuth=require('./middlewares/apiAuth')


const app = express();
app.use(cors());
app.use(express.json());
app.disable('x-powered-by')

//connect to mongoDB(configs/db.js)
ConnectDB();

//Middlewares
app.use(apiAuth) //verfies headers


//All the routes (specific to this server).

app.use('/api/v1/auth',authRoute); //For yaticorp.com

app.use('/api/v1/users',chatRoute); //For GallaBox




app.listen(process.env.PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT} in ${process.env.MODE}`);
});
