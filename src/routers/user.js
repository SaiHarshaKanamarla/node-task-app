const express = require('express');
const router = new express.Router();
const User = require('../models/user');
router.get('/test',(req,res)=>{
    res.send("this is from a new file");
});

router.post('/users',async (req,res) =>{
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
        res.status(201).send(user1);
    }catch(error){
        res.status(404).send(error);
    }    

});

router.get('/users',async (req,res) =>{
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

router.get('/users/:id',async (req,res) =>{
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

//to update an existing record in the database
router.patch('/users/:id',async (req,res)=>{ 
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Updates"});
    }

    try{
        const new_user = await User.findById(req.params.id);        
        updates.forEach((value) =>{
            new_user[value] = req.body[value];
        })        
        await new_user.save();
        //const updated =await User.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators : true}); 
        if(!new_user){
            return res.status(404).send();
        }
        res.status(200).send(new_user);
    }catch(error){  
        res.status(400).send(error);
    }
});

// to use the delete http method

router.delete('/users/:id',async (req,res) =>{
    try{
        const userDel = await User.findByIdAndDelete(req.params.id);
        if(!userDel){
            return res.status(404).send();
        }
        res.status(200).send(userDel);

    }catch(error){
        res.status(500).send();
    }
});

router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        res.status(200).send(user);
    }catch(error){
        res.status(400).send();
    }
})

module.exports = router;