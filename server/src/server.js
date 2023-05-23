const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());  //json data
app.use(bodyParser.urlencoded({extended: true}));  //form releted data build in method

const isLoggedIn = (request, response, next) =>{
    console.log("isLoggedIn Middleware");
    const login = true;
    if(login){
        request.body.id = 101;
        next();
    }else{
        return response.status(404).json({
            message: 'Please login first'
        });
    }
    next();
}
// app.use(isLoggedIn);

app.get('/test', (request, response)=>{
    response.status(200).send({
        message: "API testing is testing fine",
    });
});
app.get('/api/user',isLoggedIn, (request, response)=>{
    console.log(request.body.id);
    // console.log('user Profile');
    response.status(200).send({
        message: "User profile is returm",
    });
});

//Cliend error handeling
app.use((request, response, next)=>{
    response.status(404).json({
        message: 'Router not found'
    });
    next();
});
//Server error handeling
app.use((error, request, response, next)=>{
    console.error(error.stack);
    response.status(404).json({
        message: 'Something broken'
    });
});


app.listen(3001, ()=>{
    console.log(`Server is running at http://localhost:3001`);
});

