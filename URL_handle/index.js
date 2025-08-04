const http=require("http");
const url=require("url");
const myServer=http.createServer((req,res)=>{
    console.log(req);
    const myurl=url.parse(req.url);
    console.log(url);
    res.end("Hello this is Jainam Bheda Server");
});
myServer.listen(8000,() => console.log("Server Started"));