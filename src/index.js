var express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) 

app.post('/users',(req,res) =>{
    const user1 = new User(req.body);
    user1.save().then(()=>{
        console.log(user1);
        res.status(201).send(user1);
    }).catch((error)=>{
        console.log("Error!",error);
        res.status(400).send(error);        
    })
    console.log("Request sent");
});

app.get('/users',(req,res) =>{
    User.find({}).then((users)=>{
        res.status(200).send(users);
    }).catch((error) =>{
        res.status(500).send();   // internal server error
    })
});

app.get('/users/:id',(req,res) =>{
    const _id = req.params.id;
    console.log("id is "+_id);
    User.findById(_id).then((user) =>{
        if(!user)
            return res.status(404).send();
        res.send(user);
    }).catch((error) =>{
        res.status(500).send();
    })    
});

app.get('/tasks',(req,res) =>{    
    task.find({}).then((tasks) =>{
        console.log(tasks);
        res.status(200).send(tasks);
    }).catch((error) =>{
        res.status(500).send();
    })
});

app.get('/tasks/:id',(req,res) =>{
    const _id = req.params.id;
    task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    }).catch((error)=>{
        res.status(500).send();
    })
})

app.post('/tasks',(req,res)=>{
    const task1 = new task(req.body);
    task1.save().then(()=>{
        res.status(201).send(task1);
    }).catch((error)=>{
        res.status(400).send(error);
    })
})

app.listen(port,()=>{
    console.log("Server is running on port "+port);
});