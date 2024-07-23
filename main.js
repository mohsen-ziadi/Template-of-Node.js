// requirements
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { handler } = require('./app/errors/handlers');

// connection to the database
require('./app/DataBase/conn');
require('./app/DataBase/associations');

// routes & APIs
const api = require('./app/api');

// create app
const app = express();

// cors options
app.use(cors({ origin: process.env.CORS_DOMAINS }));

// set parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs 
app.use('/api', api);


// 404 handler
app.use(function(req, res, next) {
	next({ status: 404, success: false, message: '404, Not Found!' });
});

// error handler
app.use(handler);

// run app
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is Running on port ${process.env.PORT || 3000}`);
});
