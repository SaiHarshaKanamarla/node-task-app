var express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const task = require('./models/task');
const { response } = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) 
app.use(userRouter);
app.use(taskRouter);


app.listen(port,()=>{
    console.log("Server is running on port "+port);
});