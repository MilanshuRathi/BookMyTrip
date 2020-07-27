const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User = require(`${__dirname}/../models/userModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError=require(`${__dirname}/../utils/AppError`);
const signToken=(userId)=>jwt.sign({id:userId},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIREIN});
exports.signUp = catchAsyncError(async(request, response, next) => {
    const newUser = await User.create({
        name:request.body.name,
        email:request.body.email,
        password:request.body.password,
        passwordConfirm:request.body.passwordConfirm
    });
    const token=signToken(newUser._id);
    response.status(200).json({
        status:'success',
        token,
        data:{
            user:newUser
        }
    });            
});
exports.login=catchAsyncError(async (request,response,next)=>{
    let {email,password}=request.body;
    if(!email||!password)
        return next(new AppError('Please provide your email and password',400));    
    const user=await User.findOne({email}).select('+password');    
    if(!user||!await user.correctPassword(password,user.password))
        return next(new AppError('Incorrect email or password',401));
    const token=signToken(user._id);
    response.status(200).json({
        status:'success',
        token
    });
});