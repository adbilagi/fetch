
const fetch = require("./fetch");
let id = document.getElementById("id");
let user = document.getElementById("user");
let password = document.getElementById("password");
let resultDIV = document.getElementById("resultDiv")

document.getElementById("getUserBtn").addEventListener("click", function(){
    let userID = id.value;
    let options = {
        method : "GET"
    }
    fetch.API(`/api/user/${userID}`, options,function(err, data){
        if(err){
            resultDIV.innerHTML= err; 
        }else{
            let curHTML = `ID : ${data[0]['id']}, User : ${data[0]['user']}, Password : ${data[0]['password']}`;
            resultDIV.innerHTML = curHTML

        }
    })



});


document.getElementById('form_1').addEventListener('submit', function(e){
    e.preventDefault();
    let data = {
        user    : user.value,
        password : password.value
    }   
    let options = {
        method  : "POST",
        body    : JSON.stringify(data),
        headers : {
            "Content-Type"  : 'application/json'
        }
    }

    fetch.API(`/api/user`, options, function(err, data){
        if(err){
            resultDIV.innerHTML= err; 
        }else{
            let curHTML = `ID : ${data[0]['id']}, User : ${data[0]['user']}, Password : ${data[0]['password']}`;
            resultDIV.innerHTML = curHTML

        }
    })
    
});

document.getElementById("updateUserBtn").addEventListener('click', function(){
    let userID = id.value;
    let data = {
        user    : user.value,
        password    : password.value
    }

    let options = {
        method  : "PUT",
        body    : JSON.stringify(data),
        headers : {
            'Content-Type'  : 'application/json'
        }
    }

    fetch.API(`/api/user/${userID}`, options, function(err, data){
        if(err){
            resultDIV.innerHTML= err; 
        }else{
            let curHTML = `ID : ${data[0]['id']}, User : ${data[0]['user']}, Password : ${data[0]['password']}`;
            resultDIV.innerHTML = curHTML

        }
    })
    
})

document.getElementById("deleteUserBtn").addEventListener("click", function(){
    let userID = id.value;

    let options = {
        method  : "DELETE"
    }

    fetch.API(`/api/user/${userID}`, options, function(err, data){
        if(err){
            resultDIV.innerHTML= err;
        }else{
            resultDIV.innerHTML= JSON.stringify(data);
        }
    });
})
