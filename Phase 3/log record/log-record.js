let fs = require('fs');

let rl = require("readline-sync");

let info = require('./log.json');

function run(){
    
    let fname = rl.question("Enter the First Name: \n");

    let lname = rl.question("Enter the Last Name: \n");

    let gender = rl.question("What is your Gender: \n");

    let email = rl.question("Enter your EmailId: \n");

    let date = new Date().toLocaleString();

debugger;

        info.push({ firstName: fname, lastName: lname, gender: gender, email: email, date: date });

         fs.writeFileSync("log.json", JSON.stringify(info),(err) => {

            if(err){

                console.log(err);
             }

        });

    console.log("Sucessfully Stored Information, Thank You!");

debugger;
}

run();

