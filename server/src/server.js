const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan('dev'));
app.use(express.json());  //json data
app.use(express.urlencoded({extended: true}));  //form releted data build in method

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


app.listen(3001, ()=>{
    console.log(`Server is running at http://localhost:3001`);
});