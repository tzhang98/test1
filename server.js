/*********************************************************************************
* BTI325 – test3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ___TIANCHEN ZHANG________ Student ID: ___101569218_______ Date: __2022/11/23_______
*
* Online (Cyclic) URL:
* __https://distinct-gold-bull.cyclic.app
*
********************************************************************************/ 
var test2_moduleB= require("./test2_moduleB.js");
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var path = require("path")



app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main'

}));

app.set('view engine', '.hbs');



app.get("/", (req, res)=>{
    res.render("home");
});

app.get("/students", (req, res)=>{
    res.render("students");
});

app.get("/allStudents", (req, res)=>{
    
        test2_moduleB.allStudents().then((data)=>{
            res.render("students", {data: data});
        }).catch((err)=>{
            res.render("students", {message: err});
        });
    
});


app.get("/BSD", (req, res)=>{
    
        test2_moduleB.getBSD().then((data)=>{
            res.render("students", {data: data});
        }).catch((err)=>{
            res.render("students", {message: err});
        });
    
});


// app.get("/highGPA",(req,res)=>{
//         test2_moduleB.highGPA().then((data)=>{
//             var resText = "<h2>Highest GPA</h2>"
//             resText += "<p>Student Id: " + data.studId + "</p >"
//             resText += "<p>Name: " + data.name + "</p >"
//             resText += "<p>Program: " + data.program + "</p >"
//             resText += "<p>GPA: " + data.gpa + "</p >"
//             res.send(resText)
//         }).catch((err)=>{
//             res.json(err);
//         })
    
// }
// );


app.get("/highGPA", (req, res)=>{
    
        test2_moduleB.highGPA().then((data)=>{
            res.render("student", {data: data});
        }).catch((err)=>{
            res.render("student", {message: err});
        });
    
});



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





