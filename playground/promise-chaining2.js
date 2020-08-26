require('../src/db/mongoose.js')

const task = require('../src/models/task');
const User = require('../src/models/user.js');
const { count } = require('../src/models/user.js');

const deleteTaskAndCount = async (id) =>{
    const deleteAction = await task.deleteOne({_id:id});
    const newCount = await task.countDocuments({completed : false});
    return newCount;
}

deleteTaskAndCount('5f4165e4c66ba453843af80e').then((result)=>{
    console.log("The result is "+result);
}).catch((error) =>{
    console.log("Err",error);
})