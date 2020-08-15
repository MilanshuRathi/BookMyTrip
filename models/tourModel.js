const mongoose=require('mongoose');
const  slugify = require('slugify');
//Making a schema(data structure for the models with default data types and validations)
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A tour must have a name"],
        unique:true,
        trim:true,
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
        max:[5,"A rating must be less than 6"],        
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
    startDates:[Date],//start dates are different dates for tour start dates of a tour different times
    startLocation:{
        //GeoJson here we have to use to things atleast type and coordinates and in type we have to mention type of data with a level nested and default values and values that are accepted
        //But this will not create a seperate document it will only create an object ...to make  documents..we need to make array of such objects as shown in Location field
        type:{
            type:String,
            default:'Point',
            enum:['Point'],
        },
        coordinates:[Number],
        address:String,
        description:String
    },
    locations:[
        {
            type:{
                type:String,
                default:'Point',
                enum:['Point'],
            },
            coordinates:[Number],
            address:String,
            description:String,
            day:Number
        }
    ],
    guides:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    ]
},{toJSON:{virtuals:true}},{toObject:{virtuals:true}});

//Virtual property ...it doesnt get stored in database but we can use it ..for some purpose...and we cant use it for queries
tourSchema.virtual('reviews',{    
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'    
});
tourSchema.virtual('durationWeeks').get(function(){    
    return this.duration/7;
});
//Doccument Middleware and here this worked only because we are saving a new document ....'this' will not refer to the document while updating/insertingMany documents
tourSchema.pre('save',function(next){    
    this.slug=slugify(this.name,{lower:true});
    next();
});
//Query middleware 
tourSchema.pre(/^find/,function(next){    
    this.populate({
        path:'guides',
        select:'-__v -passwordChangedAt'
    });
    next();
});
//Mongoose have 4 types of middlewares 1)Document 2)Query 3)Aggregation Middleware 4)Model middleware

//Making a model out of a schema...which is basically a wrapping of schema to deal with CRUD operations
module.exports=mongoose.model('Tour',tourSchema);;