const express = require("express");
// const fs = require("fs");
const app = express();
const port = 8000;

//importing router 
const userRouter=require('./Routes/user')
const mongoose=require("mongoose");
// Importing all users from MOCK_DATA.json
let users = require("./MOCK_DATA.json");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // To parse JSON body in POST requests


//Routes

//any req on /user use userRouter created in MVC/ROutes/user.js
app.use('/user',userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
