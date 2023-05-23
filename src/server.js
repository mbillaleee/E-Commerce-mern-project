const express = require("express");
const app = express();

app.listen(3001, ()=>{
    console.log(`Server is running at http://localhost:3001`);
});