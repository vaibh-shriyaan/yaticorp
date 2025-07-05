// Vaibhav K
// This is the main server file to start the server(Contains all the Routes to be handled by the server.)
//All API routes are v1(version 1).

const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const helmet=require('helmet')
require('dotenv').config();
//require('./utils/cron')
const authRoute=require('./routes/authRoute')
const chatRoute=require('./routes/chatRoute')
const adminRoute=require('./routes/adminRoute')
const ConnectDB=require('./config/db');
const mongoSanitize=require('express-mongo-sanitize')
const xss=require('xss-clean')
const morgan=require('morgan')
const apiAuth=require('./middlewares/apiAuth')


// origin:['http://localhost:3000','www.gallabox.com'],    //allowed origin for API requests
  // methods:['GET','POST','PATCH'],
  // credentials:true
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet())             //security package-read more in documentation.
//app.use(mongoSanitize());   //Sanitize data against NoSQL injec
//app.use(xss());             // Sanitize data against XSS
app.disable('x-powered-by')   //removes the header
app.use(morgan('combined'));  //logs HTTP requests


//connect to mongoDB(configs/db.js)
ConnectDB();

//Middlewares
app.use(apiAuth) //verfies headers


//All the routes (specific to this server).

app.use('/api/v1/auth',authRoute); //For yaticorp.com

app.use('/api/v1/users',chatRoute); //For GallaBox

app.use('/panel',adminRoute)                  //For Admin panel




app.listen(process.env.PORT,'0.0.0.0', () => {
  console.log(`Server running in ${process.env.MODE} MODE on port ${process.env.PORT} `);
});
