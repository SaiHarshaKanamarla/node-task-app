const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./user')

const taskSchema = mongoose.Schema({
    description:{
        type: String,
        required : true,
        trim : true
    },
    completed :{
        type: Boolean,
        required : false,
        default: false
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
},{
    timestamps : true
})

const task = mongoose.model('task',taskSchema);

module.exports = task;