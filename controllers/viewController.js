const { request, response } = require("express");

const Tour=require(`${__dirname}/../models/tourModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
exports.getOverview=catchAsyncError(async(request,response)=>{    
    //1) get tours data from Tour model
    const tours=await Tour.find();//await Tour.find();
    //2)Build template
    //3)Render that template from data using 1)
    response.status(200).render('overview',{
        title:'All tours',
        tours
    });
});
exports.getTour=catchAsyncError(async(request,response)=>{       
    //1) get tour data from Tour model
    const tour=await Tour.findOne({slug:request.params.tourSlug}).populate({
        path:'reviews',
        fields:'review rating user'
    });//find that tour from slug    
    //2)Build template
    // response.status(200).json({
    //     tour
    // })
    //3)Render that template from data using 1)         
    response.status(200).render('tour-detailed',{
        title:tour.name ,
        tour       
    });
});
exports.getLoginPage=(request,response,next)=>{
    response.status(200).render('login',{title:'Login'});
};