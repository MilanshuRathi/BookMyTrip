const Tour=require(`${__dirname}/../models/tourModel`);
const APIfeatures=require(`${__dirname}/../utils/APIfeatures`);
exports.top5ToursAliasFunc=(request,response,next)=>{    
    request.query.limit='5';
    request.query.sort='-ratingsAverage,price';
    request.query.fields='name,price,ratingsAverage,summary,difficulty';
    next();
}
exports.getAllTours=async (request,response)=>{
    try{                    
        const tours=await new APIfeatures(Tour,request.query).filter().sort().fields().pagingation().query;                
        response.status(200).json({
            status:'success',
            results:tours.length,
            data:{
                tours
            }
        });
    }
    catch(err){
        response.status(404).json({
            status:'fail',
            message:err
        });
    }
};
exports.createTour=async (request,response)=>{
    try{
        const newTour=await Tour.create(request.body);
        response.status(201).json({
            status:'success',
            data:{
                tour:newTour
            }
        });
    }
    catch(err){
        response.status(400).json({
            status:'fail',
            message:err
        });
    }
};
exports.getTourById=async(request,response)=>{
    try{
        const tour=await Tour.findById(request.params.id);
        response.status(200).json({
            status:'success',
            data:{
                tour
            }
        });
    }    
    catch(err){
        response.status(404).json({
            status:'fail',
            message:err
        });
    }
};
exports.updateTourById= async(request,response)=>{
    try{
        const tour=await Tour.findByIdAndUpdate(request.params.id,request.body,{new:true,runValidators:true});        
        response.status(200).json({
            status:'success',
            data:{
                tour
            }
        });
    }
    catch(err){
        response.status(404).json({
            status:'fail',
            message:err
        });
    }
};
exports.deleteTourById=async(request,response)=>{
    try{
        await Tour.findByIdAndDelete(request.params.id);
        response.status(204).json({
            status:'success',
            data:null
        });
    }
    catch(err){
        response.status(400).json({
            status:'fail',
            message:err
        })
    }    
};