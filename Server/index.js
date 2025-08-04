const http=require("http");
const myServer=http.createServer((req,res)=>{
    console.log(req);
    res.end("Hello this is Jainam Bheda Server");
});
myServer.listen(8000,() => console.log("Server Started"));