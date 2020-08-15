const catchAsyncError=require(`${__dirname}/catchAsyncError`);
const AppError=require(`${__dirname}/AppError`);
exports.deleteOne=Model=>catchAsyncError(async (request,response,next)=>{
    const doc=await Model.findByIdAndDelete(request.params.id);
    if(!doc)
        return next(new AppError('No document exists with that id',404));
    response.status(204).json({
        status:'success',
        data:null
    }); 
});
exports.updateOne=Model=>catchAsyncError(async (request, response, next)=>{
    const doc = await Model.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
    if(!doc)
        return next(new AppError('No document found with that ID',404));    
    response.status(200).json({
        status: 'success',
        data: {
            "updatedDoc":doc
        }
    });    
});
exports.createOne=Model=>catchAsyncError(async (request, response, next) => {    
    const doc = await Model.create(request.body);         
    response.status(201).json({
        status: 'success',
        data: {
            "document":doc
        }
    });    
});
exports.getOne=Model=>catchAsyncError(async (request, response, next) => {    
    const doc = await Tour.findById(request.params.id).populate('reviews');
    if(!tour)
        return next(new AppError('No tour found with that ID',404));
    response.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });            
});