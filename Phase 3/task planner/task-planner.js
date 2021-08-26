let http = require("http");
const fs = require('fs');
let url = require("url");

taskList = [];

let content = `
            
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Task Planner</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
        <link rel="stylesheet" href="">
        
        <style>
        body {background-color: rgb(76, 199, 248);}
        
        h3   {color: blue;
        font-style: italic;
        font-family: fantasy;
        text-decoration: underline;}
        
        .center {
          border: 5px solid #0d2c49;
          text-align: center;
        }

        .center1 {
            border: 1px solid #0d2c49;
            text-align: center;
          }

</style>
    </head>
    <body>

        <div class="center1">
        <br>
        <h3>Task Planner</h3>
        <br>
        </div>

        <hr>
     
        <div class="center">
            <br>
            <br>
            <h3>Add Tasks</h3>
            <form action="/addTask">

                <label>Emp ID:</label>
                <input type="text" name="empid">
                <br>
                
                <label>Task ID:</label>
                <input type="text" name="taskid">
                <br>
                
                <label>Task:</label>
                <input type="text" name="task">
                <br>
                
                <label>Deadline:</label>
                <input type="date" name="deadline">
                <br>
                <br>
                
                <input type="submit" value="Add Task">
                <input type="reset" value="Reset">
                <br>
                <br>


            </form>

        </div>
        
        <hr>

        
        <div class="center">
        <br>
        <br>
            <h3>Delete Task</h3>
            
            <form action="/deleteTask">
                
                <label>Task ID:</label>
                <input type="text" name="taskId"/>
                <br>
                <br>
                <input type="submit" value="Delete"/>
                <br>
                <br>
            </form>
        
        </div>

        <hr>
        
        <div class="center">
        <br>
        <br>
            <h3>List Tasks</h3><br>
            
            <form action="/display">

                <input type="submit" value="List all tasks"/>
                <br>
                <br>

            </form>
        </div>
 
        
    </body>
</html>

`;


function delTask(val){

    for (var i=0; i < taskList.length; i++)
    {
        if (taskList[i].taskid == val){

            taskList.splice(i, 1);

            fs.writeFileSync("tasks.json", JSON.stringify(taskList));

            console.log("Task ID " +val+ " deleted successfully.");
            
            return;
        }
    }
    console.log("Sorry cannot delete Task ID " +val+ " Please check your input");

}




let Server = http.createServer((request, response)=>{

    let urlPath = url.parse(request.url, true);

    if(urlPath.path != "/favicon.ico"){

        taskList=JSON.parse(fs.readFileSync("tasks.json").toString());

        response.write(content);

        if (urlPath.pathname=="/addTask"){

            let taskdetail = urlPath.query;

            let result = taskList.find(item => item.taskid == taskdetail.taskid);

            console.log(result);

            if (result == undefined){
                // addTask(newTask);

            let task = {
                
                empid:taskdetail.empid, 
                taskid:taskdetail.taskid, 
                task:taskdetail.task, 
                deadline:taskdetail.deadline
            };

            taskList.push(task);

            console.log("Task is entered: ");

            console.log(task);

            fs.writeFileSync("tasks.json", JSON.stringify(taskList));

            response.write("Task Added");

            } 
            
            else {

                response.write("Task ID must be unique Please try again!!!");

                console.log("Task ID must be unique Please try again!!!");

            }
        }

        else if(urlPath.pathname=="/deleteTask"){

            let rmTask = urlPath.query;

            delTask(rmTask.taskId);

            response.write("Successfully deleted Task ID");

        }

        if(urlPath.pathname=="/display"){

            let Data = require("./tasks.json");
            let tableBody ="";
            
            let tableData = "<table border = 1 class=\"table table-striped table-dark\"><tr><th scope='col'>Emp id</th><th scope='col'>Task id</th><th scope='col'>Task detail</th><th scope='col'>Task Deadline</th><tr>";


            for(var i = 0; i<Data.length;i++)
            {

             tableBody += "<tr><td>"+Data[i].empid+"</td><td>"+Data[i].taskid+"</td><td>"+Data[i].task+"</td><td>"+Data[i].deadline+"</td><tr>";
            
            }

            let tableEnd = "</table>";

            tableBody=tableData+tableBody+tableEnd;

            response.write(tableBody);
        }

    }

 response.end();

});

Server.listen(9090,()=>console.log("Server is running on port number 9090"));