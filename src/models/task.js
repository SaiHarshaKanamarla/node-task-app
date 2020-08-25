const mongoose = require('mongoose');
const validator = require('validator');

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
    }
})

module.exports = task;