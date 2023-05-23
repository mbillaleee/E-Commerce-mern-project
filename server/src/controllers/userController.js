const createError = require('http-errors');



//GET: api/users
const getUser = (request, response, next)=>{
    try{
        response.status(200).send({
            message: "Users were return",
            users: users,
        });
    }catch(error){
        next(error);
    }
}

module.exports = getUser;
