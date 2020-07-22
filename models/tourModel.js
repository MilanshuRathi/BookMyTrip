const mongoose=require('mongoose');
//Making a schema(data structure for the models with default data types and validations)
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A tour must have a name"],
        unique:true
    },
    rating:{
        type:Number,
        default:4.0,    
    },
    price:{
        type:Number,
        required:[true,"A tour must have a price"]
    }
});
//Making a model out of a schema...which is basically a wrapping of schema to deal with CRUD operations
const Tour=mongoose.model('Tour',tourSchema);
module.exports=Tour;