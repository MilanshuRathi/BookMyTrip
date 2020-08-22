const mongoose=require('mongoose');
const bookingSchema=new mongoose.Schema({
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[true,'A booking must have a tour']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'A booking must have a user']
    },
    price:{
        type:Number,
        required:[true,'A tour must have a price']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    paid:{
        type:Boolean,
        default:true
    }
});
bookingSchema.pre(/^find/,function(next){
    this.populate('user').populate({path:'tour',fields:'name'});
    next();
});
module.exports=mongoose.model('Booking',bookingSchema);