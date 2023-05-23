const express = require("express");
const app = express();

app.get("/", (request, response)=>{
    response.status(200).send({
        message: "welcome to the server",
    });
});
app.get("/products", (request, response)=>{
    response.status(200).send({
        message: 'Products are return',
    });
});
app.listen(3001, ()=>{
    console.log(`Server is running at http://localhost:3001`);
});