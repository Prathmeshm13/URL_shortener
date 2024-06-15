const sessionidtouser=new Map();
function setUser(id,user){
    sessionidtouser.set(id,user);
}
function getUser(id){
    return sessionidtouser.get(id);
}

module.exports={
    setUser,
    getUser
}