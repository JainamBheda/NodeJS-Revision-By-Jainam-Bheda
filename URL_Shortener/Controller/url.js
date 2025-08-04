const {nanoid} = require('nanoid');
const URL=require("../Models/url")
async function generatenewshorturl(req,res){
    const shortID=nanoid(8);
    await URL.create({
        shortID:shortID,
        reDirectURL
    })
}