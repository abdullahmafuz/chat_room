const express=require("express");

const router=express.Router();


var paths=__dirname;
    const newpath=paths.slice(0,paths.length-6)
    


router.get("/",(req,res)=>{
   
    
    res.sendFile(newpath + 'pages/index.html');
    
})

router.get("/style/index.css",(req,res)=>{
    
  
    res.sendFile(newpath + '/pages/style/index.css')
    
})
router.get("/asset/login_gif.gif",(req,res)=>{

    res.sendFile(newpath + `/pages/${req.url}`);
    
    
})

router.get("/script/script.js",(req,res)=>{

    res.sendFile(newpath + `/pages/${req.url}`);

    
})

router.get("/asset/geometric-background.jpg",(req,res)=>{

    res.sendFile(newpath + `/pages/${req.url}`);
    
    
})

router.get("/asset/chat-bg.jpg",(req,res)=>{

    res.sendFile(newpath + `/pages/${req.url}`);
    
})

module.exports=router;