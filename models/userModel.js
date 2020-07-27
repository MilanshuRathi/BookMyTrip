const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');
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
    photo: String,
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
    }
});
userSchema.methods.correctPassword=async(candidatePassword,userPassword)=>await bcrypt.compare(candidatePassword,userPassword);
userSchema.pre('save',async function(next){
    //It will only proceed if user's password is modified else it will return
    if(!this.isModified('password'))    return next();
    //Hashing the password with cost 12
    this.password=await bcrypt.hash(this.password,12);
    //Deleting passwordConfirm because we don't need it anymore (password is already confirmed)
    this.passwordConfirm=undefined;
});
const User = mongoose.model('User', userSchema);
module.exports = User;