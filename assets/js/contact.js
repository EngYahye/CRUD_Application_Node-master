const contactForm = document.querySelector('.contact-form')
let Name=document.getElementById('name')
let email = document.getElementById('email')
let message =document.getElementById('message')
 contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
  let formData={
   Name:Name.value,
    email:email.value,
    message:message.value
  }
 let xhr = new XMLHttpRequest();
 xhr.open('POST','/')
 xhr.setRequestHeader('Content-Type', 'application/json')
 xhr.onload=function(){
    console.log(xhr.responseText)
    if(xhr.responseText=='success'){
        alert('email sent')
        Name.value='',
        email.value='',
        message.value=''
    }
    else{
        alert('something went wrong')
    }

 }
 xhr.send(JSON.stringify(formData))
 })