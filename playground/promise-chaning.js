require('../src/db/mongoose.js')

const task = require('../src/models/task');
const User = require('../src/models/user.js');

//5f443910ab6eea00a462d47c


// task.deleteOne({
//     _id: '5f443910ab6eea00a462d47c'
// }).then((result) =>{
//     console.log(result);
//     return task.countDocuments({completed : false})
// }).then((result) =>{
//     console.log("No of records is "+result);
// }).catch((error=>{
//     console.log("Error");
// }))

const updateAgeandCount = async (id,age) =>{
    const user = await User.findByIdAndUpdate(id,{age:age});
    const count = await User.countDocuments({age : age});
    return count;
}

updateAgeandCount('5f43ee5921dc120f10da43b4',63).then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
})