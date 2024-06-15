const express=require("express");
const connecttomongo=require("./connect")
const staticroute=require("./routes/staticrouter")
const cookieparser=require("cookie-parser")
const {restricttologgedinusers,checkauth}=require("./middlewares/auth")
const URL=require("./models/url")
const path=require("path")
const app=express()
const PORT=8000
app.use(cookieparser());
app.set('view engine', "ejs")
app.set("views",path.resolve("./views"));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
connecttomongo("mongodb://localhost:27017/short-url")
.then(()=>(console.log("Mongo Connected")))
.catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
app.use("/",checkauth,staticroute)
const routeurl=require("./routes/url")
const routeuser=require("./routes/user")
app.use("/user",routeuser);
app.get("/test", async (req, res) => {
    try {
        const allurls = await URL.find({});
        res.render("home", {
            urls: allurls,
        });
    } catch (err) {
        res.status(500).send("Error fetching URLs: " + err);
    }
});
app.get("/url/:shortid", async (req,res)=>{
    const sid=req.params.shortid;
    console.log(sid);
    const entry=await URL.findOneAndUpdate({
        shortID:sid
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        }
    }})
    
    if (entry && entry.redirectURL) {
        console.log("Redirecting to:", entry.redirectURL); // Log the redirect URL
        res.redirect(entry.redirectURL); // Redirect to the correct URL
      } else {
        res.status(404).send("URL not found"); // Handle missing entry
      }
})
app.use("/url",restricttologgedinusers,routeurl);
app.listen(PORT,console.log(`Server started at port ${PORT}`))