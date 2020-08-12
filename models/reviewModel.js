//review/rating/createdAt/ref to Tour /ref to USer
const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
    review:{        
        type:String,        
        required:[true,'Review can\'t be empty']
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[true,'A review must belong to a tour']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'A review must belong to a user']
    }    
},{toJSON:{virtuals:true}},{toObject:{virtuals:true}});
//Document middlewares

//Query middlewares 
reviewSchema.pre(/^find/,function(next){
    //We have to call populate  for each field of schema we want to get populated    
    this.populate({
        path:'user',
        select:'name photo'
    });
    next();
});
module.exports=mongoose.model('Review',reviewSchema);