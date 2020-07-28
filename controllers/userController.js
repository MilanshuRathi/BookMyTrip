const mongoose=require('mongoose');
const User=require(`${__dirname}/../models/userModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError=require(`${__dirname}/../utils/AppError`);
const APIfeatures = require(`${__dirname}/../utils/APIfeatures`);
exports.getAllUsers=catchAsyncError(async (request,response,next)=>{
    const users=await User.find();
    response.status(200).json({
        status:'success',
        results:users.length,
        data:{
            users
        }
    });    
});
exports.getUserById=(request,response)=>{
    response.status(500).json({
        status:'error',
        data:{
            message:'This route is not updated yet'
        }
    });
};
exports.updateUserById=(request,response)=>{
    response.status(500).json({
        status:'error',
        data:{
            message:'This route is not updated yet'
        }
    });
};
exports.deleteUserById=(request,response)=>{
    response.status(500).json({
        status:'error',
        data:{
            message:'This route is not updated yet'
        }
    });
};