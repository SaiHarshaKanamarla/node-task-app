var express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const task = require('./models/task');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) 

app.post('/users',async (req,res) =>{
    const user1 = new User(req.body);
    // user1.save().then(()=>{
    //     console.log(user1);
    //     res.status(201).send(user1);
    // }).catch((error)=>{
    //     console.log("Error!",error);
    //     res.status(400).send(error);        
    // })
    // console.log("Request sent");

    try{
        await user1.save();
        res.status(201).send(user1)
    }catch(error){
        res.status(404).send(error);
    }    

});

app.get('/users',async (req,res) =>{
    // User.find({}).then((users)=>{
    //     res.status(200).send(users);
    // }).catch((error) =>{
    //     res.status(500).send();   // internal server error
    // })

    try{
        const user = await User.find({});
        res.status(200).send(user);
    }catch(error){
        res.status(404).send(error);
    }
});

app.get('/users/:id',async (req,res) =>{
    const _id = req.params.id;   
    // User.findById(_id).then((user) =>{
    //     if(!user)
    //         return res.status(404).send();
    //     res.send(user);
    // }).catch((error) =>{
    //     res.status(500).send();
    // })    
    try{
        const user = await User.findById({_id:_id});
        if(!user){
            res.status(404).send();
        }else{
            res.status(200).send(user);
        }
    }catch(error){
        res.status(500).send(error);
    }
});

app.get('/tasks',async (req,res) =>{    
    // task.find({}).then((tasks) =>{
    //     console.log(tasks);
    //     res.status(200).send(tasks);
    // }).catch((error) =>{
    //     res.status(500).send();
    // })
    const task1 =await task.find({});
    try{        
        res.status(200).send(task1);
    }catch(error){
        res.status(404).send();
    }
});

app.get('/tasks/:id',async (req,res) =>{
    const _id = req.params.id;
    // task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send();
    //     }
    //     res.status(200).send(task);
    // }).catch((error)=>{
    //     res.status(500).send();
    // })
    const task1 = await task.findById({_id:_id});
    try{
        res.status(200).send(task1);
    }catch(error){
        res.status(404).send();
    }
})

app.post('/tasks',async (req,res)=>{
    const task1 = await new task(req.body);
    // task1.save().then(()=>{
    //     res.status(201).send(task1);
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // })
    try{
        res.status(200).send(task1);
    }catch(error){
        res.status(404).send();
    }
})

app.listen(port,()=>{
    console.log("Server is running on port "+port);
});