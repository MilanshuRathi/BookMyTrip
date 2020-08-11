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
        refer:'Tour',
        required:[true,'A review must belong to a tour']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        refer:'User',
        required:[true,'A review must belong to a user']
    }    
},{toJSON:{virtuals:true},toObject:{virtuals:true}});
module.exports=mongoose.model('Review',reviewSchema);