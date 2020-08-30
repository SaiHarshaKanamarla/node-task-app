var express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');
const User = require('./models/user');
const task = require('./models/task');
const { response } = require('express');
const bcryptjs = require('bcryptjs');


const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{
//    if(req.method === 'GET'){
//         res.send('GET Requests are disabled');
//    }else{
//         next();
//    }
// })

// app.use((req,res,next) =>{
//     if(req.method){
//         return res.status(503).send("Site under maintenance");        
//     }
// })

app.use(express.json()) 
app.use(userRouter);
app.use(taskRouter);


app.listen(port,()=>{
    console.log("Server is running on port "+port);
});


const pet = {
    name : 'Hal'
}


const jwt = require('jsonwebtoken');

// const myFunc = async () =>{
//     // const password = "Red12345!"
//     // const hashedPws = await bcryptjs.hash(password, 8);
//     // console.log(hashedPws);

//     // const match = await bcryptjs.compare(password,hashedPws);
//     // console.log(match);

//     // Creating a jwt 
//     const token = jwt.sign({_id : 'abc123'},'thisismynewcourse',{expiresIn : '7 days'});      // This returns a jwt token which is used for authentication. This is used by the client.
//     console.log(token);

//     // verification
//     const payloadData = jwt.verify(token,'thisismynewcourse')
//     console.log(payloadData);
// }




// const main  = async () =>{

//     // This code is finding a user based on a task id.

//     // const task1 = await task.findById('5f4bd3a8d317d37588e6368e');
//     // await task1.populate('owner').execPopulate() // It will find the user associated with the task and task1.owner will be the whole profile
//     // console.log(task1.owner);

//     // this code is finding all the tasks that are created by our user.
//     try{
//     const user = await User.findById('5f4bd23463982d6d8479ee84');
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
//     }catch(error){
//         console.log(error);
//     }

// }

// main();