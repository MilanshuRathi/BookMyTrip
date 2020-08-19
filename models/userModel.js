const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lower: true,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: {
        type:String,
        default:'default.jpg'
    },
    role:{
        type:String,
        enum:['user','admin','guide','lead-guide'],
        default:'user'
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select:false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (val) {
                return this.password === val;
            },
            message: "Passwords don't match"
        }
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpire:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }
});
//Document Middleware section

userSchema.pre('save',async function(next){
    //It will only proceed if user's password is modified else it will return
    if(!this.isModified('password'))    return next();
    //Hashing the password with cost 12
    this.password=await bcrypt.hash(this.password,12);
    //Deleting passwordConfirm because we don't need it anymore (password is already confirmed)
    this.passwordConfirm=undefined;
});
userSchema.pre('save',function(next){
    //If the password isn't changed or the document is new ...we don't change the passwordChange timestamp
    if(!this.isModified('password')||this.isNew)
        return next();
    /*one second early because...sometimes the token is issued to the user before saving..the document,
    which affects the passwordChangedAt ...which will not gonna user log in */
    this.passwordChangedAt=Date.now()-1000;
    next();
});

//Query Middleware section

userSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}});
    next();
});
//Instance methods section
userSchema.methods.correctPassword=async(candidatePassword,userPassword)=>await bcrypt.compare(candidatePassword,userPassword);
userSchema.methods.isPasswordChanged=function(JWTTimeStamp){
    if(this.passwordChangedAt)
        return JWTTimeStamp<this.passwordChangedAt.getTime();
    return false;
}
userSchema.methods.createPasswordResetToken=async function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpire=Date.now()+(10*60*1000);
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);