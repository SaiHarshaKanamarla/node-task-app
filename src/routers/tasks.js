const express = require('express');
const router = new express.Router();

const task = require('../models/task');

router.get('/testtasks',(req,res)=>{
    res.send("This is from tasks")
});

router.get('/tasks',async (req,res) =>{    
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

router.get('/tasks/:id',async (req,res) =>{
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

router.post('/tasks',async (req,res)=>{
    const task1 = new task(req.body);
    // task1.save().then(()=>{
    //     res.status(201).send(task1);
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // })
    const newTask = await task1.save();
    try{
        res.status(200).send(newTask);
    }catch(error){
        res.status(404).send();
    }
})



router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation){
        res.status(404).send({error : "Invalid Updates"});
    }

    try{
        const newTask = await task.findById(req.params.id);

        updates.forEach((update)=>{
            newTask[update] = req.body[update];
        });
        await newTask.save();
        //const updates = await task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators : true});
        if(!newTask){
            return res.status(400).send();
        }
        res.status(200).send(newTask);
    }catch(error){
        res.status(500).send();
    }
});


router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task1 = await task.findByIdAndDelete(req.params.id);
        if(!task1){
            res.status(404).send();
        }
        res.status(200).send(task1);
    }catch(error){
        res.status(500).send();
    }
})

module.exports = router;