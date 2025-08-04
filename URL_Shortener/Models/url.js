const moongoose=require('mongoose');
const urlSchema=new moongoose.Schema({
    ShortId:{
        type: String,
        required: true,
        unique: true,
    },
    reDirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[
        {
            timestamp : {
                type:number
            }
        }
    ]
},
{timestamp : true});

const URL=moongoose.model("url",urlSchema);

module.exports=URL;w