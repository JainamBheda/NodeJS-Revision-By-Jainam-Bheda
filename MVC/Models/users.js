const mongoose=require("mongoose");

//connect MongoDB
mongoose.connect('mongodb://127.0.0.01:27017/Jainam-Bheda')
        .then(()=> console.log("Mongo DB connected"))
        .catch((err)=>console.log("Mongoose error",err));


// Make schema structure using moongoose
const userSchema=new mongoose.Schema({
    firstname:{
        type: String,
        required:true,
    },
});

//Making Model from schema structure
const user=mongoose.model('user',userSchema);

module.exports = user;