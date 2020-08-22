const fs=require('fs');
const mongoose=require('mongoose');
require('dotenv').config();
const Tour=require(`${__dirname}/models/tourModel`);
const User=require(`${__dirname}/models/userModel`);
const Review=require(`${__dirname}/models/reviewModel`);
const Booking=require(`${__dirname}/models/bookingModel`);
const path=process.env.DB.replace('<PASSWORD>',process.env.DB_PASSWD);
mongoose.connect(path,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true});
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));
const users=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));
const reviews=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/reviews.json`));
const importData=async()=>{
    try{
        await Tour.create(tours);
        await User.create(users,{validateBeforeSave:false});
        await Review.create(reviews);
        console.log('Data loaded successfully');
    }    
    catch(err){
        console.log(err);
    }
    process.exit();
};
const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        await Booking.deleteMany();
        console.log('Data deleted successfully');
    }    
    catch(err){
        console.log(err);
    }
    process.exit();
};
if(process.argv[2]==='--import')
    importData();
else if(process.argv[2]==='--delete')
    deleteData();
else    
    process.exit();