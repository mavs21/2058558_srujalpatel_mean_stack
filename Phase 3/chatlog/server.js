let app = require("express")();

let http = require("http").Server(app);

let io = require("socket.io")(http);

let mongoClient = require("mongodb").MongoClient

let url = "mongodb://localhost:27017"

var name, message;

let now = new Date();

app.get("/",(request,response)=>{

    response.sendFile(__dirname+"/index.html");

})

io.on("connection",(socket)=>{

    console.log("Client connected to the application....");

    socket.on("Name",(user)=>{

        console.log(user);

        name = user;

    })

    socket.on("Message",(msg)=>{

        message = msg;

        console.log(msg);

        mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=>{
    
            if(!err1){
                
                let db = client.db("tcsmean");

                db.collection("ChatRec").insertOne({Name:name,Message:message,Time:now});

                console.log("Successfully Stored the Chat.");
            }
            else{

                console.log("Unable to Store Chat.");
            
            }
            
        });
    })
})


http.listen(1010,()=>console.log('server running on port number 1010'));