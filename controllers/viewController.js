const { finished } = require("nodemailer/lib/xoauth2");

const Tour=require(`${__dirname}/../models/tourModel`);
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
exports.getOverview=catchAsyncError(async(request,response)=>{    
    //1) get tour data from Tour model
    const tours=await Tour.find();//await Tour.find();
    //2)Build template
    //3)Render that template from data using 1)
    response.status(200).render('overview',{
        title:'All tours',
        tours
    });
});
exports.getTour=(request,response)=>{    
    response.status(200).render('tour',{
       title:'The Forest Hiker'
    });
};