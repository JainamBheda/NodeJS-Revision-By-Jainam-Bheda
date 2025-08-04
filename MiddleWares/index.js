const express=require("express");
const app=express();
const port = 8000;

//middleware - It is function that have access to following in req-res cycle
// res , req and next middleware 
//anything changes done in req , the changes is affected in furthire middle ware and server side also 


// to continue cycle of middleware "next" is used to call the next middleware
app.use((req,res,next)=>{
    console.log("This is middleware 1");
    next(); 
});


app.use((req,res,next)=>{
    console.log("The is middleware 2");
    next();
})

//as we can see this middleware stopped req-res cycle
app.use((req,res,next)=>{
    console.log("This is middleware 3 and there is no next");
    return res.send("This is last middleware with no next keywork hence next routes not executed");
})

app.get("/users",(req,res) =>{
    res.send("Hey I am jainam bheda");
})
app.listen(port , ()=>{
    console.log("Server Started");
});