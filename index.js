const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const path  = require("path");



const user = require("./model/user");

const app = express();
app.listen(9000);

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use(express.static("public"));

app.get("/api/user/:id", function(req, res){
    try {
        // throw Error("testing Error");
        user.getUser(req.params.id,function(err, data){
            if(err){
                throw err
            }else{
                res.send(data);
            }
        })
    } catch (error) {

        res.status(500).send(error.message);
    }
});

app.post("/api/user", function(req, res){
    try {
        user.insertUser(req.body, function(err, data){
            if(err){
                throw Error(err)
            }else{
                
                user.getUser(data.insertId, function(err, data){
                    if(err){
                        throw Error(err)
                    }else{
                        res.send(data);
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).send(error.message);
        
    }
});

app.put("/api/user/:id", function(req, res){
    try {
        user.updateUser(req.params.id, req.body, function(err, data){
            if(err){
                throw err;
            }else{
                user.getUser(req.params.id, function(err, data){
                    if(err){
                        throw err;
                    }else{
                        res.send(data);
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).send(error.message);
        
    }
})

app.delete("/api/user/:id", function(req, res){
    try {
        user.deleteUser(req.params.id, function(err, data){
            if(err){
                throw err;
            }else{
                res.send(data);
            }
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/index.html"));
})