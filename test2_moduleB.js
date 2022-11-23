var fs=require('fs');
var students = [];

exports.prepare=function() {
    return new Promise(function(resolve, reject){
    fs.readFile('./students.json', (err,empdata)=>{

        if (err) {
            reject('unable to read file');
        }
        else {
        
            students = JSON.parse(empdata);

             resolve('Operation was successful');
        }
       
        
    });
})
}

exports.getBSD=function() {
    return new Promise(function(resolve, reject){
        if (students.length == 0) {
            reject('no results returned');
        }
        else {
            const BSDStudents = [];
            for (let i = 0; i < students.length; i++) {
                if (students[i].program == "BSD") {
                    BSDStudents.push(students[i]);
                }
            }
            resolve(BSDStudents);
        }
    });
}



exports.highGPA=function() {
    return new Promise(function(resolve, reject){
        if (students.length == 0) {
            reject('Failed finding the student with the highest GPA');
        }
        else {
            let max = 0;
            let maxStudent = null;
            for (let i = 0; i < students.length; i++) {
                if (students[i].gpa > max) {
                    max = students[i].gpa;
                    maxStudent = students[i];
                }
            }
            resolve(maxStudent);
        }
    });
}

exports.allStudents=function() {    
    return new Promise(function(resolve, reject){
        if (students.length == 0) {
            reject('no results returned');
        }
        else {
            resolve(students); 
        }
    });
}
