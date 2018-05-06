(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
exports.API = function(route, options, callback){
    fetch(route, options).then(function(result){
        if(result.ok){
            return result.json();
        }else{
            throw result.text();
        }
    }).then(function(resJSON){
        callback(null, resJSON)
    }).catch(function(err){
        err.then(function(errStr){
            callback(errStr);
        })
    });
}
},{}],2:[function(require,module,exports){

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

},{"./fetch":1}]},{},[2]);
