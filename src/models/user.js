const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true,
        trim : true    
    },
    email: {
        type : String,
        unique : true,
        required : true,
        trim: true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }        
    },
    age : {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error("Age must be a positive number");
            }
        }
    },
    password: {
        type: String,
        required : true,
        minlength : 7,
        trim : true,
        validate(value){
            if(value.toLowerCase().trim() == "password"){
                throw new Error("Select another password")
            }
        }

    },
    tokens:[{
        token : {
            type: String,
            required : true
        }
    }]

});

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email:email});
    if(!user){
        throw new Error("Unable to login");
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch){
        throw new Error("Unable to login");
    }
    return user;

}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},'thisismynewcourse');
    user.tokens = user.tokens.concat({token : token});
    await user.save();
    return token;

}

// Hashing the plain text password before saving

userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password,8);
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User;