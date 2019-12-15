




const socket=io();



const loginbtn=document.getElementById('login');
const username=document.getElementById('username');

const loginpg=document.querySelector('.container');




const userList=document.querySelector('.users-list');

const msgList=document.querySelector('.msg-list');





const chatContainer=document.querySelector('.chat');



const bkmsg =document.querySelector('.bk-msg');



window.addEventListener('DOMContentLoaded',()=>{


    let username=location.search.slice(10);

    socket.emit("has connected",username);

    socket.on("has connected",(data)=>{
        userList.innerHTML='';
        
        updateUser(data.userList);
    
        let msg=' has connected ';
    
       
       let msgLi = document.createElement("li");
       msgLi.innerHTML=`<b><i>${data.user}</i></b>  ${msg}`
       msgList.appendChild(msgLi);
       bkmsg.scrollTo(0,9999);
    
    })
    
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
    bkmsg.scrollTo(0,9999);
}








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






const uploadbtn=document.querySelector('#uploadbtn')

const uploadContainer=document.querySelector('#upload-container');
const uploadinput=document.querySelector('#upload-container input');

const fileUpload=document.querySelector('#fileupload');
const close=document.querySelector('#close');




fileUpload.addEventListener('click',(e)=>{


    socket.emit("upload",'upload');
    
    uploadContainer.classList.add('none');

    


})

function uploadFile(user,file){

    let msgLi = document.createElement("li");
    msgLi.innerHTML=`<b><i>${user}</i></b> <br/> &ensp; <embed src='${file}' />`
    msgList.appendChild(msgLi);
    bkmsg.scrollTo(0,9999);
}

socket.on("upload",(data)=>{
    uploadFile(data.username,data.file)

})




uploadbtn.addEventListener('click',()=>{
    uploadContainer.classList.remove('none');
})



close.addEventListener('click',()=>{
    uploadContainer.classList.add('none');
})
