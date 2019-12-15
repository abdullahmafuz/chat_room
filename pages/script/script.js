



const loginbtn=document.getElementById('login');
const username=document.getElementById('username');

const loginpg=document.querySelector('.container');




const userList=document.querySelector('.users-list');

const msgList=document.querySelector('.msg-list');





const chatContainer=document.querySelector('.chat');



const bkmsg =document.querySelector('.bk-msg');

loginbtn.addEventListener('click',()=>{

    

    if(username.value === ''|| username.value ==' ' ){
        alert("Please Enter the Username to Join chart Room")
        
    }
    

})

username.addEventListener('keyup',(event)=>{

    
    
    if(event.keyCode === 13){
        if(username.value === ''|| username.value ==' ' ){
            alert("Please Enter the Username to Join chart Room")
            
        }
     

    }
})





