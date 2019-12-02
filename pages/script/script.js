



const socket=io();

const loginbtn=document.getElementById('login');
const username=document.getElementById('username');

const loginpg=document.querySelector('.container');




const userList=document.querySelector('.users-list');

const msgList=document.querySelector('.msg-list');




loginbtn.addEventListener('click',()=>{

    if(username.value === ''|| username.value ==' ' ){
        alert("Please Enter the Username to Join chart Room")
        
    }
    else{
        msgList.innerHTML='';
        loginpg.classList.add('none');

        socket.emit("has connected",username.value);

    }
    

})

username.addEventListener('keyup',(event)=>{
    if(event.keyCode === 13){
        if(username.value === ''|| username.value ==' ' ){
            alert("Please Enter the Username to Join chart Room")
            
        }
        else{
            msgList.innerHTML='';
            loginpg.classList.add('none');
    
            socket.emit("has connected",username.value);
    
        }

    }
})







function updateUser(users){
    for(user of users){

    
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(user));
        userList.appendChild(li);
        
    }
}

function updateUserConnection(user,msg){

    let msgLi = document.createElement("li");
    msgLi.innerHTML=`<b><i>${user}</i></b> <br/> &ensp; ${msg}`
    msgList.appendChild(msgLi);
}


socket.on("has connected",(data)=>{
    userList.innerHTML='';
    
    updateUser(data.userList);

    let msg=' has connected ';

   
   let msgLi = document.createElement("li");
   msgLi.innerHTML=`<b><i>${data.user}</i></b>  ${msg}`
   msgList.appendChild(msgLi);

})


socket.on("has disconnected",(data)=>{
    userList.innerHTML='';
    updateUser(data.userList);

    let msg=' has disconnected ';

    updateUserConnection(data.user,msg);

})




const sendbtn=document.getElementById('chat-btn-input');

const sendInput=document.getElementById('chat-input');

sendbtn.addEventListener('click',()=>{


    if(sendInput.value === ''|| sendInput.value ==' ' ){
        alert("You can't send empty message ...")
    }
    else{
        
        
        socket.emit("new message",sendInput.value);
        sendInput.value=''
        
    }
    
})


sendInput.addEventListener('keyup',(event)=>{
    if(event.keyCode === 13){
        if(sendInput.value === ''|| sendInput.value ==' ' ){
            alert("You can't send empty message ...")
        }
        else{
            
            
            socket.emit("new message",sendInput.value);
            sendInput.value=''
            
        }

    }
})

socket.on("new message",(data)=>{

    let username= data.username 

    updateUserConnection(username,data.msg);
    
})