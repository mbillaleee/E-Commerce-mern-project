const createError = require("http-errors");
const fs = require("fs");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");

const { findWithId } = require("../services/findItem");

//GET: api/users
const getUsers = async (request, response, next) => {
  try {
    const search = request.query.search || "";
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true }, //ne=not equal
      $or: [
        //multiple condition er jonno or use korte hobe
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const option = { password: 0 }; //search query return password omit hobe
    //10 users
    const users = await User.find(filter, option)
      .limit(limit) //at a time limit sonkok user return korbe || first limit sonkok return korbe
      .skip((page - 1) * limit); //next page first limit sonkok user skip hobe  || 3rd page e limit + limit  = limit sonkok user skip korbe

    const count = await User.find(filter).countDocuments(); //searching filtering er por base kore count korbe

    if (!users) throw createError(404, "no users found"); //jodi user na pay tayle this message show korbe
    return successResponse(response, {
      statusCode: 200,
      message: "Users were return successfully",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page - 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const getUser = async (request, response, next) => {
  try {
    const id = request.params.id;
    const options = { password: 0 };
    const user = await findWithId(id, options);

    return successResponse(response, {
      statusCode: 200,
      message: "Users was return successfully",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (request, response, next) => {
  try {
    const id = request.params.id;
    const options = { password: 0 };
    const user = await findWithId(id, options);

    const userImagePath = user.image;
    fs.access(userImagePath, (error) => {
      if (error) {
        console.error("User does not exist");
      }else {
        fs.unlink(userImagePath, (error) => {
          if (error) throw error;
          console.log("User image was deleted");
        });
      }
    });

    await User.findByIdAndDelete({
        _id:id,
        isAdmin: false
    });


    return successResponse(response, {
      statusCode: 200,
      message: "Users was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUser, deleteUser };
