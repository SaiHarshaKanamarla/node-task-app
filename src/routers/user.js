const express = require('express');
const router = new express.Router();
const User = require('../models/user');

//setting up a middleware for an individual route

const auth = require('../middleware/auth');
router.get('/test',(req,res)=>{
    res.send("this is from a new file");
});

// this is to create a user
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
    const token = await user1.generateAuthToken();      
    try{
        await user1.save(user1);        
        res.status(201).send({user1,token});
    }catch(error){
        res.status(404).send(error);
    }    

});

router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user,token});
        //res.send({user:user,token})
    }catch(error){
        res.status(400).send();
    }
});

router.get('/users/me',auth,async (req,res) =>{ // here the second argument is the middleware function that we want to execute. This is the way we can integrate a middleware functionality to a route.
    // User.find({}).then((users)=>{
    //     res.status(200).send(users);
    // }).catch((error) =>{
    //     res.status(500).send();   // internal server error
    // })
    
    //Here the async call back will only run if the middleware function 'auth' calls next()
    // try{
    //     const user = await User.find({});
    //     res.status(200).send(user);
    // }catch(error){
    //     res.status(404).send(error);
    // }
    res.send(req.user);
});

// router.get('/users/:id',async (req,res) =>{
//     const _id = req.params.id;   
//     // User.findById(_id).then((user) =>{
//     //     if(!user)
//     //         return res.status(404).send();
//     //     res.send(user);
//     // }).catch((error) =>{
//     //     res.status(500).send();
//     // })    
//     try{
//         const user = await User.findById({_id:_id});
//         if(!user){
//             res.status(404).send();
//         }else{
//             res.status(200).send(user);
//         }
//     }catch(error){
//         res.status(500).send(error);
//     }
// });

//to update an existing record in the database
router.patch('/users/me',auth,async (req,res)=>{ 
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Updates"});
    }

    try{
        // const new_user = await User.findById(req.params.id);        
        updates.forEach((value) =>{
            // new_user[value] = req.body[value];
            req.user[value] = req.body[value];
        })        
        await req.user.save();
        //const updated =await User.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators : true}); 
        // if(!req.user){
        //     return res.status(404).send();
        // }
        res.status(200).send(req.user);
    }catch(error){  
        res.status(400).send(error);
    }
});

// to use the delete http method

router.delete('/users/me',auth,async (req,res) =>{
    try{
        // const userDel = await User.findByIdAndDelete(req.user._id);
        // if(!userDel){
        //     return res.status(404).send();
        await req.user.remove();        
        res.status(200).send(req.user);          
    }catch(error){
        res.status(500).send();
    }
});


router.post('/users/logout',auth,async(req,res)=>{
    try{    
        req.user.tokens = req.user.tokens.filter((token) => {
            return token !== req.token;
        })
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
});

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        req.user.save();
        res.status(200).send("Successfully Logged out");
    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;