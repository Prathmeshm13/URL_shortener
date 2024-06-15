const User=require("../models/user")
const {v4:uuidv4}=require("uuid")
const {setUser,getUser}=require("../service/auth")
async function handleusersignup(req,res){
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect("/");
}
async function handleuserlogin(req,res){
    const{email,password}=req.body;
    const user= await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error:"invalid"
        })
    }
    const sessionid=uuidv4();
    setUser(sessionid,user);
    res.cookie("uid",sessionid);
    return res.redirect("/");
}
module.exports={handleusersignup,handleuserlogin}