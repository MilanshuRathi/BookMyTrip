const mongoose=require('mongoose');
const  slugify = require('slugify');

//Making a schema(data structure for the models with default data types and validations)
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A tour must have a name"],
        unique:true,
        minlength:[10,"A tour must have a min value greather than 9"],
        maxlength:[40,"A tour must have a min value less than 41"]
    },
    duration:{
        type:Number,
        required:[true,"A tour must have a duration"]
    },
    difficulty:{
        type:String,
        required:[true,"A tour must have a difficulty"],      
        enum:{
            values:["easy","medium","difficult"],
            message:"A difficult must be easy,medium or difficult"
        }
    },
    maxGroupSize:{
        type:Number,
        required:[true,"A tour must have a group size"]
    },
    ratingsAverage:{
        type:Number,
        default:4.5,
        min:[1,"A rating must be greater than 0"],
        max:[5,"A rating must be less than 6"]
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,"A tour must have a price"]
    },
    discount:{
        type:Number,
        validate:{
            validator:function(val){
                        //here this refers to the current document and only works while creating a New document ,it wont work for *UPDATING* a document
                        return val<this.price;
                    },
            message:"Discount should be less than the price"                    
        }
    },
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
    secretTour:{
        type:Boolean,
        default:false
    },
    slug:String,
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDates:[Date]//start dates are different dates for tour start dates of a tour different times
},{toJSON:{virtuals:true}},{toObject:{virtuals:true}});

//Virtual property ...it doesnt get stored in database but we can use it ..for some purpose...and we cant use it for queries
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/7;
});
//Doccument Middleware and here this worked only because we are saving a new document ....'this' will not refer to the document while updating/insertingMany documents
tourSchema.pre('save',function(next){
    this.slug=slugify(this.name,{lower:true});
    next();
});

//Mongoose have 4 types of middlewares 1)Document 2)Query 3)Aggregation Middleware 4)Model middleware

//Making a model out of a schema...which is basically a wrapping of schema to deal with CRUD operations
const Tour=mongoose.model('Tour',tourSchema);
module.exports=Tour;