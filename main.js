const express=require("express");
const app=express();
const http=require("http");
const multer=require('multer');
const path =require('path');


const server = http.Server(app)
var users=[];

const io=require("socket.io")(server);

const staticPath =path.join(__dirname,'./pages');


//Static files
app.use(express.static(staticPath));
app.use(express.json({ extended:false }));

//multer diskStorage 
//creating storage 

const storage=multer.diskStorage({
    destination:'./pages/upload/',
    filename:function(req,file,cb){

        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }

})



// init upload


const upload = multer({
    storage:storage
}).single('myfile');




app.get('/chatroom',(req,res)=>{
    res.sendFile('chatroom.html');
})


var filename;
app.post('/upload',async(req,res)=>{
    var file;
    
   await upload(req,res, (err)=>{
      
       
        if(err){
            
            console.log(err)

        }else{

            if(req.file == undefined){
                res.status(204).send();
            }
            else{
                filename=`/upload/${req.file.filename}`;             
               
                res.status(204).send(file);
            }
     
        }
    })

   
})

   

//Socket.io connection

io.on("connection",(socket)=>{
    
    var name='';
    

    socket.on("has connected",(username)=>{
        name=username
       users.push(username);
       
       io.emit("has connected",{user:username ,userList:users});
    })
    

    socket.on("disconnect",(username)=>{
       
        users.splice(users.indexOf(name),1);

        io.emit("has disconnected",{user:name ,userList:users});

    })

    socket.on("new message",(msg)=>{
        
        io.emit("new message",{msg:msg,username:name})
       
    })
    
    var data;
   
    
    socket.on("upload",(data)=>{

        function checkForValue(){

            if(filename !== undefined ){
                
                io.emit("upload",{file:filename,username:name})
                filename=undefined;
                return 
            }
            setTimeout(()=>{
                checkForValue()
            },2000);
            
            
        }

        checkForValue();
    
            
    
        
        
        
           
    })

   
       
       
    
    
})



const port =process.env.PORT || 3002;

server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
    console.log(`http://localhost:${port}/`)
    
});
