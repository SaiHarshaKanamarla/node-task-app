//CRUD Operations
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = "task-manager";
const id = new ObjectID();
console.log(id);

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client)=>{
    if(error){
        console.log("Unable to connect to database");
        return;
    }
    
    const db = client.db(databaseName); // This db object can be used to manipulate the database

    // db.collection('users').insertOne({
    //     // _id : id,
    //     name : 'Vikram',
    //     age : 25
    // },(error,result) =>{
    //     if(error)
    //         return console.log(error);
    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description : "Get Groceries",
    //         completed : true
    //     },
    //     {
    //         description : "Take out trash",
    //         completed: false
    //     },
    //     {
    //         description : "Have coffee",
    //         completed : true
    //     }
    // ],(error,response) =>{
    //     if(error)
    //         return console.log(error);
    //     console.log(response.ops);
    // })

    // fetching the data from the database -- find and findOne

    // db.collection('users').findOne({
    //     _id: new ObjectID("5f3aaa51642e891fc49d4440")
    // },(error,response) =>{
    //         if(error)
    //             return console.log(error);
    //         console.log(response);
    // })
    // find only returns a cursor
    // db.collection('users').find({
    //     age : 23
    // }).toArray((err,users) =>{
    //     console.log(users);
    // })

    // db.collection('users').find({
    //     age : 23
    // }).count((err,users) =>{
    //     console.log(users);
    // })

    // db.collection('tasks').findOne({
    //     _id : new ObjectID("5f3979b4b17ad39760469f4a")
    // },(err,response) =>{
    //     if(err)
    //         return console.log(err);
    //     console.log("res is "+JSON.stringify(response));

    // });
    // console.log("----------------");
    // db.collection('tasks').find({
    //     completed : false
    // }).toArray((error,data) =>{
    //     console.log(data);
    //})

    // db.collection('users').insertOne({
    //     name : "Siddu",
    //     age :22
    // },(error,response) =>{
    //     if(error)
    //         return console.log(error);
    //     console.log(response.ops);
    // })

    // db.collection('users').updateOne({
    //     _id : new ObjectID("5f3ae4db5c20c6545455230b")
    // },{
    //     $set:{
    //         name : "Siddharth Harsha"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error) =>{
    //     console.log(error);
    // })

    // db.collection('users').updateOne({
    //     _id : new ObjectID("5f39761128c9da5738b23a0b")
    // },{
    //     $inc : {age : -30}
    // }).then((result) =>{
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({
    //     completed : false
    // },{
    //     $set : {completed : true}
    // }).then((response) =>{
    //     console.log(response);
    // }).catch((error) => {
    //     console.log(error);
    // })

    db.collection('users').deleteOne({
        age : 22
    }).then((result) =>{
        console.log(result);
    }).catch((error) =>{
        console.log(error);
    })

})