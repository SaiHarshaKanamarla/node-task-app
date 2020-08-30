const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

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

},{
    timestamps : true
});

userSchema.virtual('tasks',{
    ref : 'task',
    localField: '_id',
    foreignField : 'owner'
})

userSchema.statics.findByCredentials = async(email, password) => { //statics -- on the User model
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

userSchema.methods.generateAuthToken = async function(){ // methods --  for individual user we are operating on
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},'thisismynewcourse');  
    user.tokens = user.tokens.concat({token : token});        
    await user.save();
    return token;

}

userSchema.methods.toJSON = function(){
    const user = this;
    const userData = user.toObject()
    delete userData.password;
    delete userData.tokens;
    return userData;
}

// Hashing the plain text password before saving

userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password,8);
    }
    next()
});


//deletes user tasks when the user is removed

userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({owner : user._id});
    next();
})

const User = mongoose.model('User',userSchema)

module.exports = User;