//file handling in Node JS 
const fs=require("fs");

//writing a file using .writeFileSync() ->synchronus code
fs.writeFileSync("./test.txt","Hey my name is Jainam Bheda");

//Writing a file using .writeFile() -> Asynchronus code 
fs.writeFile("./test_asyn.txt","Hey this is asynchronus code",(err)=>{"there was error"});

//reading a file using .readFileSync() ->synchronus code
const res = fs.readFileSync("./test.txt","utf-8");
console.log(res);

//reading a file using .readFile() ->asynchronus code 
fs.readFile("./test.txt","utf-8",(err,result) => {
    if(err) {
        console.log("There was error");
    }
    else{
        console.log(result);
    }
});

