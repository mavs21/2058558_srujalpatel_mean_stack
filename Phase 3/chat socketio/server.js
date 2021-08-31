const { Socket } = require("dgram");
const { response } = require("express");
const { request } = require("http");

let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);


app.get("/",(request,response)=>{
    response.sendFile(__dirname+"/index.html");

 
})

io.on("connection",(socket)=>{
    console.log("Congratulation Client is successfully connected....");

    socket.on("Name",(msg)=>{
        console.log("Name :",msg);
    });

    socket.on("Message",(msg)=>{
        console.log("Message :",msg);
    });

    socket.on("Time",(msg)=>{
        console.log("Date: ",msg);
    });

    socket.emit("msg1","You are connected to server");

   

});



http.listen(9090,()=> console.log('Server running on port number 9090'));