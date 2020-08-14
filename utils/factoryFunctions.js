const { response } = require("express");

const catchAsync=require(`${__dirname}/catchAsyncError`);
const AppError=require(`${__dirname}/AppError`);
exports.deleteOne=Model=>catchAsync(async (request,response,next)=>{
    const doc=await Model.findByIdAndDelete(request.params.id);
    if(!doc)
        return next(new AppError('No document exists with that id',404));
    response.status(204).json({
        status:'success',
        data:null
    }); 
});