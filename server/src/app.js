const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());  //json data
app.use(bodyParser.urlencoded({extended: true}));  //form releted data build in method



app.get('/test', (request, response)=>{
    response.status(200).send({
        message: "API testing is testing fine",
    });
});
app.get('/api/user', (request, response)=>{
    console.log(request.body.id);
    // console.log('user Profile');
    response.status(200).send({
        message: "User profile is returm",
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