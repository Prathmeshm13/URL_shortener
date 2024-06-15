const {setUser,getUser}=require("../service/auth")
async function restricttologgedinusers(req,res,next){
    const userUid=req.cookies?.uid;
    console.log("User UID:", userUid); // Debugging log
    if(!userUid)return res.redirect("/user/login");
    const user=getUser(userUid);
    if(!user)return res.redirect("/user/login");
    req.user=user;
    next();
}
async function checkauth(req,res,next){
    const userUid=req.cookies?.uid;
    const user=getUser(userUid);
    req.user=user;
    next();
}
module.exports={
    restricttologgedinusers,
    checkauth
}