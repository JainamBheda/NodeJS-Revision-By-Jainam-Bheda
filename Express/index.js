const http=require("http");

//express ko import karo
const express=require("express");

//ek application banao
const app = express();

//Basic Routing handle - > app.METHOD(PATH,HANDLER)
app.get("/",(req,res)=>{
    return res.send("Hello Jainam this is home page");
});

app.get("/about",(req,res)=>{
    return res.send("Hello Bheda this is about page");
})

app.listen(4000,()=> console.log("Server started"));
//above line can also be written 
// const myserver=http.createServer(app);
// myserver.listen(4000,()=> console.log("Server started"));