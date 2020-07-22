const Tour=require(`${__dirname}/../models/tourModel`);
exports.getAllTours=(request,response)=>{
    response.status(200).json({
        status:'success',
        data:{
            message:'Data recieved'
        }
    });
};
exports.createTour=(request,response)=>{
    response.status(201).json({
        status:'success',
        data:{
            message:'Data recieved'
        }
    });
};
exports.getTourById=(request,response)=>{
    response.status(200).json({
        status:'success',
        data:{
            message:'Data recieved'
        }
    });
};
exports.updateTourById=(request,response)=>{
    response.status(200).json({
        status:'success',
        data:{
            message:'Data recieved'
        }
    });
};
exports.deleteTourById=(request,response)=>{
    response.status(204).json({
        status:'success',
        data:null
    });    
};