const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const task = require('../models/task');

router.get('/testtasks',(req,res)=>{
    res.send("This is from tasks")
});

router.get('/tasks',auth,async (req,res) =>{    
    // task.find({}).then((tasks) =>{
    //     console.log(tasks);
    //     res.status(200).send(tasks);
    // }).catch((error) =>{
    //     res.status(500).send();
    // })
    //const task1 =await task.find({owner : req.user._id,path});   
    const match = {}
    // if(req.query.completed){
    //     match.completed = req.query.completed === 'true'
    // }       
    try{      
        // await req.user.populate({
        //     path : 'tasks',
        //     match: match
        // }).execPopulate()  
        const measure = req.query.completed;
        if(measure == 'true' || measure == 'false'){
            var value = (measure == 'true');        
            var task1 = await task.find({owner : req.user._id,completed : value});
        }else{
            var task1 = await task.find({owner : req.user._id});
        }
        
        res.status(200).send(task1);
    }catch(error){
        res.status(404).send();
    }
});

router.get('/tasks/:id',auth,async (req,res) =>{
    const _id = req.params.id;
    // task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send();
    //     }
    //     res.status(200).send(task);
    // }).catch((error)=>{
    //     res.status(500).send();
    // })
    //const task1 = await task.findById({_id:_id});
    const task1 = await task.findOne({_id, owner: req.user._id})
    console.log(task1);
    if(!task1){
        return res.status(404).send();
    }
    try{
        res.status(200).send(task1);
    }catch(error){
        res.status(404).send();
    }
})

router.post('/tasks',auth,async (req,res)=>{
    //const task1 = new task(req.body);

    const task1 = new task({
        ...req.body,
        owner : req.user._id
    })


    // task1.save().then(()=>{
    //     res.status(201).send(task1);
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // })    
    try{
        const newTask = await task1.save();
        res.status(201).send(newTask);
    }catch(error){
        res.status(404).send();
    }
})



router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation){
        res.status(404).send({error : "Invalid Updates"});
    }

    try{
        //const newTask = await task.findById(req.params.id);
        const newTask = await task.findOne({_id:req.params.id,owner:req.user._id})

        
        //const updates = await task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators : true});
        if(!newTask){
            return res.status(400).send();
        }

        updates.forEach((update)=>{
            newTask[update] = req.body[update];
        });
        await newTask.save();
        res.status(200).send(newTask);
    }catch(error){
        res.status(500).send();
    }
});


router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        //const task1 = await task.findByIdAndDelete(req.params.id);
        const task1 = await task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task1){
            res.status(404).send();
        }
        res.status(200).send(task1);
    }catch(error){
        res.status(500).send();
    }
})

module.exports = router;