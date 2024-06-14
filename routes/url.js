const express=require("express");
const router=express.Router();
const {genurl}=require("../controllers/url")
router.post("/",genurl);
module.exports=router;

