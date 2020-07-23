const mongoose=require('mongoose');
//Making a schema(data structure for the models with default data types and validations)
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A tour must have a name"],
        unique:true
    },
    duration:{
        type:Number,
        required:[true,"A tour must have a duration"]
    },
    difficulty:{
        type:String,
        required:[true,"A tour must have a difficulty"]          
    },
    maxGroupSize:{
        type:Number,
        required:[true,"A tour must have a group size"]
    },
    ratingAverage:{
        type:Number,
        default:4.5
    },
    ratingQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,"A tour must have a price"]
    },
    discount:Number,
    summary:{
        type:String,
        trim:true,
        required:[true,"A tour must have a summary"]
    },
    description:{
        type:String,
        trim:true,
    },
    imageCover:{
        type:String,
        required:[true,"A tour must have a cover image"]
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDates:[Date]//start dates are different dates for tour start dates of a tour different times
});
//Making a model out of a schema...which is basically a wrapping of schema to deal with CRUD operations
const Tour=mongoose.model('Tour',tourSchema);
module.exports=Tour;