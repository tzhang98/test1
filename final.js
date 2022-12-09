var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var finalUsersSchema = new Schema({
    email: {type: String, unique: true},
    password: String
});

let finalUsers;

function startDB() {
    return new Promise(function(resolve, reject){
        let uri = "mongodb+srv://dbUser:dbUser@senecaweb.przehd8.mongodb.net/?retryWrites=true&w=majority";
        let db = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        db.on('error', (err)=>{
            console.log("Cannot connect to DB.");
            reject(err);
        });
        db.once('open', ()=>{
            console.log("DB connection successful.");
            finalUsers = db.model("finalUsers", finalUsersSchema);
            resolve();
        });
    });
}


function register(user) {
    return new Promise(function(resolve, reject){
        if (user.email == "" || user.password == "") {
            reject("Error: email or password cannot be empty.");
        }
        let newuser = new finalUser({
            email: user.email,
            password: user.password
        })
        newuser.save().then(()=>{
            resolve(user);
        }
        ).catch((err)=>{
            if (err.code == 11000) {
                reject("Error: email already exists.");
            }else
            reject("Error: cannot register the user.");
        }
        );

           
           
    });
}



function signIn(user) {
    return new Promise(function(resolve, reject){
        finalUsers.findOne({email: user.email}).then((user)=>{
            if (user) {
                if (user.password == user.password) {
                    resolve(user);
                }
                else {
                    reject("Incorrect password for user: "+ user.email);
                }
            }
           
        }).catch((err)=>{
            reject("Error: cannot find the user."+ user.email);
        });
    });
}

module.exports = {
    startDB: startDB,
    register: register,
    signIn: signIn
};



