const express=require("express");
const router=express.Router();
const {genurl}=require("../controllers/url")
const vo=require("../controllers")
router.post("/",genurl);
module.exports=router;

