var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path")





app.get("/",(req,res)=>{
    res.send("Declaration(Instruction:text size in heading 2)");
    res.send("Name: Tianchen Zhang(Tommy)");
    res.send("Student ID: 101569218");
}
);

app.get("/test1",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/test1.html"));
}
);



app.use(function(req,res){
    res.status(404).send("Page Not Found"); 
});





    function onHttpStart() {
        console.log("Express http server listening on: " + HTTP_PORT);
    }

    app.listen(HTTP_PORT,onHttpStart);


