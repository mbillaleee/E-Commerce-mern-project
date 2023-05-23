const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');


const app = express();

const rateLimiter = rateLimit({
    windowMs: 1* 60 * 1000, // 1 minute
    max: 5,
    message: 'Too many request from this IP. please try again later',
});

app.use(rateLimiter);
app.use(xssClean());
app.use(morgan('dev'));
app.use(bodyParser.json());  //json data
app.use(bodyParser.urlencoded({extended: true}));  //form releted data build in method

app.use("/api/users",userRouter);

app.get('/test', (request, response)=>{
    response.status(200).send({
        message: "API testing is testing fine",
    });
});


//Cliend error handeling
app.use((request, response, next)=>{
    next(createError(404, 'Router not found'));
});

//Server error handeling -->all the error ....finally
app.use((error, request, response, next)=>{
    return response.status(error.status || 500).json({
        success: false,
        message: error.message,
    });
});




module.exports = app;