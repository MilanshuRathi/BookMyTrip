const multer=require('multer');
const sharp=require('sharp');
const User=require(`${__dirname}/../models/userModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError=require(`${__dirname}/../utils/AppError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);

//MulterStorage is to get whole control of file storage to us including the destination and file name
// const multerStorage=multer.diskStorage({
//     destination:(request,file,cb)=>{
//         cb(null,'public/img/users');
//     },
//     filename:(request,file,cb)=>{
//         //filename format= user-(userId)-(currentDate).(extension)
//         const ext=file.mimetype.split('/')[1];
//         cb(null,`user-${request.user.id}-${Date.now()}.${ext}`);
//     }
// });
const multerStorage=multer.memoryStorage();//Doing it because we need to resize image thats why we will store img in buffer 
const multerFilter=(request,file,cb)=>{    
    file.mimetype.startsWith('image')?cb(null,true):cb(new AppError('NOT an image,Please upload an image only',404,false));
}
const upload=multer({storage:multerStorage,fileFilter:multerFilter});//initializing oject to upload files and setting path of storage

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
exports.uploadUserPhoto=upload.single('photo');
exports.resizeUserPhoto=catchAsyncError(async (request,response,next)=>{
    if(!request.file)  return next();
    request.file.filename=`user-${request.user.id}-${Date.now()}.jpeg`;
    await sharp(request.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/img/users/${request.file.filename}`);
    //using sharp for resizing img into 500X500,converting into jpeg,compressing it by 10% and then storing it to the disk on the destination
    next();
});
exports.getMe=(request,response,next)=>{
    request.params.id=request.user.id;
    next();
}
exports.updateMe=catchAsyncError(async (request,response,next)=>{       
    if(request.body.password||request.body.passwordConfirm)
        return next(new AppError('This route is not for password updates,Please use /updatePassword',400));
    //Filer user data ..to remove data other than required to terminate any malicious code 
    const filteredObj=filterObj(request.body,'name','email');
    if(request.file) filteredObj.photo=request.file.filename;
    //Get the updated user with given details            
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