const express=require("express");
const connecttomongo=require("./connect")
const URL=require("./models/url")
const app=express()
const PORT=8000
app.use(express.json())
connecttomongo("mongodb://localhost:27017/short-url")
.then(()=>(console.log("Mongo Connected")))
.catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
const routeurl=require("./routes/url")
app.get("/:shortid", async (req,res)=>{
    const sid=req.params.shortID;
    console.log(sid);
    const entry=await URL.findOneAndUpdate({
        sid
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
app.use("/url",routeurl);
app.listen(PORT,console.log(`Server started at port ${PORT}`))