const express=require("express");
const app=express();
const http=require("http");

const path =require('path');

const server = http.Server(app)
var users=[];

const io=require("socket.io")(server);

const staticPath =path.join(__dirname,'./pages');

app.use(express.static(staticPath));









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

    
})



const port =process.env.PORT || 3002;

server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
    console.log(`http://localhost:${port}/`)
    
});
