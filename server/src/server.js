const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));  //

app.get("/test", (request, response)=>{
    response.status(200).send({
        message: "API is testing fine",
    });
});

app.listen(3001, ()=>{
    console.log(`Server is running at http://localhost:3001`);
});