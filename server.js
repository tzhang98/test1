/*********************************************************************************
* BTI325 – test4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ___TIANCHEN ZHANG________ Student ID: ___101569218_______ Date: __2022/12/9_______
*
* Online (Cyclic) URL:
* __https://distinct-gold-bull.cyclic.app
*
********************************************************************************/ 
//var test2_moduleB= require("./test2_moduleB.js");
var final= require("./final.js");
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var path = require("path")










//Home route (GET, “/”)
//Responds with file: home.html (details below).

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"/finalViews/home.html"));
}
);

app.get("/register", (req, res)=>{
    res.sendFile(path.join(__dirname,"/finalViews/register.html"));
}
);




app.post("/register", (req, res)=>{
    final.register(req.body).then((user)=>{
        let resText ="<h2>"+user.email+" registered successfully</h2> <br> <a href='/'> Go Home </a>";
        res.send(resText);
        let newuser = new final.User(user);
        newuser.save();
    }).catch((err)=>{
        res.send(err);
    });
}
);

app.get("/signIn", (req, res)=>{
    res.sendFile(path.join(__dirname,"/finalViews/signIn.html"));
}
);




app.post("/signIn", (req, res)=>{
    final.signIn(req.body).then((user)=>{
        let resText ="<h2>"+user.email+" signin successfully</h2> <br> <a href='/'> Go Home </a>";
        res.send(resText);
    }).catch((err)=>{
        res.send(err);
    });
}
);







app.use(function(req,res){
    res.status(404).send("Page Not Found"); 
}); 

   


    // On server.js, make sure this function startDB() successfully resolves, then start the
    // server (app.listen()). Otherwise, catch the error and display the error.


    final.startDB().then(()=>{
        app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT);
        
        });
    }).catch((err)=>{
        console.log(err);
    });


