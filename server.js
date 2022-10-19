/*********************************************************************************
* BTI325 – test2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ___TIANCHEN ZHANG________ Student ID: ___101569218_______ Date: __2022/10/5_______
*
* Online (Cyclic) URL:
* __https://distinct-gold-bull.cyclic.app/
*
********************************************************************************/ 
var test2_moduleB= require("./test2_moduleB.js");
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path")






app.get("/", (req, res)=>{
    let resText =" <h2>I acknowledge the College's academic integrity policy – and my own integrity – remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates.…. even when no one is watching. I declare I will not break that trust. <h2/><br><h2>Name:<b style='background-color: yellow;'>Tianchen Zhang</b><br>Student Number:<b style='background-color: yellow;'>101569218</b></h2>";
    resText += "<a href='/CPA'>Click to visit CPA Students</a></br></br>";
    resText += "<a href='/highGPA'>Click to see who has the higest GPA</a>";
    res.send(resText);
});



app.get("/CPA",(req,res)=>{
  
        test2_moduleB.getCPA().then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json(err);
        })
   
});


app.get("/highGPA",(req,res)=>{
        test2_moduleB.highGPA().then((data)=>{
            var resText = "<h2>Highest GPA</h2>"
            resText += "<p>Student Id: " + data.studId + "</p >"
            resText += "<p>Name: " + data.name + "</p >"
            resText += "<p>Program: " + data.program + "</p >"
            resText += "<p>GPA: " + data.gpa + "</p >"
            res.send(resText)
        }).catch((err)=>{
            res.json(err);
        })
    
}
);





app.use(function(req,res){
    res.status(404).send("Page Not Found"); 
});

   
    test2_moduleB.prepare().then(()=>{
        app.listen(HTTP_PORT,onHttpStart);
    }).catch((err)=>{
        console.log(err);
    });

    function onHttpStart() {
        console.log("Express http server listening on: " + HTTP_PORT);
    }





