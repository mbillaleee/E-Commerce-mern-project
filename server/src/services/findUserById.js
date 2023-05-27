const createError = require('http-errors');
const User = require("../models/userModel");
const { default: mongoose } = require('mongoose');

const findUserById = async (id) =>{
    try{
        const option = {password: 0};
        const user = await User.findById(id, option);

        if(!user){
            throw createError(404, 'User does not exist with this id');
        }
        return user;
    }catch(error){
        if(error instanceof mongoose.Error){
            throw createError(404, 'Invalid user ID');
            return;
        }
        throw error;
    }
};

module.exports = { findUserById };