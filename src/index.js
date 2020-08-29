var express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const task = require('./models/task');
const { response } = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');
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

const myFunc = async () =>{
    // const password = "Red12345!"
    // const hashedPws = await bcryptjs.hash(password, 8);
    // console.log(hashedPws);

    // const match = await bcryptjs.compare(password,hashedPws);
    // console.log(match);

    // Creating a jwt 
    const token = jwt.sign({_id : 'abc123'},'thisismynewcourse',{expiresIn : '7 days'});      // This returns a jwt token which is used for authentication. This is used by the client.
    console.log(token);

    // verification
    const payloadData = jwt.verify(token,'thisismynewcourse')
    console.log(payloadData);
}

myFunc();
