const User=require(`${__dirname}/../models/userModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError=require(`${__dirname}/../utils/AppError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);
//Util Methods
const filterObj=(obj,...arr)=>{
 const mp={},newObj={};
    for(let i=0;i<arr.length;i++)
        mp[arr[i]]=true;    
    for(const el in obj){
        if(mp[el])
            newObj[el]=obj[el];
    }
    return newObj;
}

//Exporting methods
exports.getMe=(request,response,next)=>{
    request.params.id=request.user.id;
    next();
}
exports.updateMe=catchAsyncError(async (request,response,next)=>{
    if(request.body.password||request.body.passwordConfirm)
        return next(new AppError('This route is not for password updates,Please use /updatePassword',400));
    //Filer user data ..to remove data other than required to terminate any malicious code 
    const filteredObj=filterObj(request.body,'name','email');
    //Get the updated user with given details    
    console.log(filteredObj);     
    const updatedUser=await User.findByIdAndUpdate(request.user._id,filteredObj,{new:true,runValidators:true});
    //Send the updatedUser response
    response.status(200).json({
        status:'success',
        data:{
            updatedUser
        }
    });
});
exports.deleteMe=catchAsyncError(async(request,response,next)=>{
    await User.findByIdAndUpdate(request.user._id,{active:false});
    response.status(204).json({
        status:'success',
        data:null
    });    
});
exports.getAllUsers=factory.getAll(User);
exports.getUserById=factory.getOne(User);
exports.updateUserById=factory.updateOne(User);
exports.deleteUserById=factory.deleteOne(User);