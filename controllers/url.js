const shortid = require("shortid");
const URL=require("../models/url")
async function genurl(req,res){
    const body=req.body;
    const shortidd=shortid();
    if(!body.url){
        return res.status(400).json({error:"url is req"});
    }
    await URL.create({
        shortID:shortidd,
        redirectURL:body.url,
        visitHistory:[]
    })
    return res.json({id:shortidd})
}
module.exports={
    genurl
}