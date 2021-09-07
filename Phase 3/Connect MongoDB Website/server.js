let app = require("express")();
let http = require("http").Server(app);
let bodyParser = require("body-parser");
let obj =  require("mongoose");

let url = "mongodb://localhost:27017/tcsmean";

obj.pluralize(null);

app.use(bodyParser.urlencoded({extended:true}));

obj.connect(url).then(res=>console.log("Connected")).catch(err=>console.log(err));

let db = obj.connection;

db.on("error",(err)=>console.log(err));

app.get("/",(request,response)=>{
    response.sendFile(__dirname+"/index.html");
});


db.on("open",()=>{

    let CourseSchema = obj.Schema({

        _id: Number,
        course: String,
        description: String,
        amount: Number

    });

    let CourseRec = obj.model("CourseRec",CourseSchema);


    // adding courses

    app.get("/add",(request,response)=>{

        response.sendFile(__dirname+"/add.html");

    });

    app.post("/add",(request,response)=>{
       
        let courseobj={

            _id: request.body.courseid,
            course: request.body.course,
            description: request.body.description,
            amount: request.body.amount
        }

        let data = new CourseRec(courseobj);

        data.save((result,err)=>{
            
            if(!err){
                
                console.log(result);
            }
            else{
                console.log(err)
            }

            obj.disconnect();

        });

        response.redirect("/");
    });

    // Updating courses

    app.get("/update",(request,response)=>{

        response.sendFile(__dirname+"/update.html");

    });

    app.post("/update",(request,response)=>{

        CourseRec.updateOne({_id: request.body.courseid},{$set:{amount:request.body.amount}},(err,result)=> {   

            if (!err && (result.modifiedCount>0 || result.matchedCount>0)) {

                console.log("Successfully Updated The Course");
            }
            else {
                console.log("Unable To Update The Course");
            }

            obj.disconnect();

            response.redirect("/");

        });

    });


    // Delete Course

    app.get("/delete",(request,response)=>{

        response.sendFile(__dirname+"/delete.html");

    });

    app.post("/delete",(request,response)=>{

       
        CourseRec.deleteOne({_id: request.body.courseid},(err,result)=> {

            if(!err){
                
                if(result.deletedCount>0){
                    
                    console.log("Record deleted ");

                }

                else {
                    
                    console.log("Record not present");
                }
            }

            obj.disconnect();

            response.redirect("/");

        });
    });


    app.get("/fetchcourse",(request,response)=>{
        
        CourseRec.find({}, (err,info)=> {
            
            if (!err) {


                response.write("<h1>Course List</h1>");
                
                response.write("<table border=1><tr><th>ID</th><th>Course Name</th><th>Description</th><th>Cost</th></tr>");
                
                info.forEach(fetch=> {
                
                    response.write("<tr><td>"+fetch._id+"</td><td>"+fetch.course+"</td><td>"+fetch.description+"</td><td>"+fetch.amount+"</td></tr>");
                
                });

                response.write("</table>");
               
                response.end();
            }

            else {
                console.log(err);
            }
            obj.disconnect();

        });

    });

    

});



http.listen(1010,()=>console.log("Server running on port 1010"));