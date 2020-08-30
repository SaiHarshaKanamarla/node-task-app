const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./user')

const task = mongoose.model('task',{
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
})

module.exports = task;