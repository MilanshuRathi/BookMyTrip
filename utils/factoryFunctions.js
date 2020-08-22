const catchAsyncError=require(`${__dirname}/catchAsyncError`);
const AppError=require(`${__dirname}/AppError`);
const APIfeatures=require(`${__dirname}/APIfeatures`);
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
            "document":doc
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
exports.getOne=(Model,populateOptions)=>catchAsyncError(async (request, response, next) => {    
    let query= Model.findById(request.params.id);
    if(populateOptions) 
        query=query.populate(populateOptions);
    const doc = await query;
    if(!doc)
        return next(new AppError('No tour found with that ID',404));    
    response.status(200).json({
        status: 'success',
        data: {
            "document":doc
        }
    });            
});
exports.getAll=Model=>catchAsyncError(async (request, response, next) => {                     
    let filter=null;
    if(request.params.tourId) filter={tour:request.params.tourId};
    else if(request.params.userId) filter={user:request.params.userId};
    const doc = await new APIfeatures(filter?Model.find(filter):Model, request.query).filter().sort().fields().pagination().query;//.explain(); explain is to give a representation of analysis of query
    response.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            "document":doc
        }
    });    
});