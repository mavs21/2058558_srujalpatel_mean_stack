//creating function for add data

function addData(){

    var cname = document.getElementById("cname").value;
    var pname = document.getElementById("pname").value;
    var budget = document.getElementById("bud").value;

    var comp = JSON.parse(localStorage.getItem("comp") || "[]" );

    var cmp = {c:cname, p:pname, b:budget};

    comp.push(cmp);

    localStorage.setItem("comp",JSON.stringify(comp));

    //when you click on add alert will popup a success message.

    alert("Client Data Stored Successfully  " + cmp.c)



}


// main.js 

function dispData(){

    var comp = JSON.parse(localStorage.getItem("comp") || "[]" );

    var table = "";

    
    var tableStart = "<label class='label1'><h1>Annual Budget</h1></label><br><br><table border=5 id='customers'><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>";
    

    var tableEnd = "</table>";


    var formatcurrency = new Intl.NumberFormat('en-US', {
        
        style: 'currency',
        currency: 'USD',

    });

    var total = 0;

    comp.forEach(element => {

        table += "<tr><td>"+element.c+"</td><td>"+element.p+"</td><td>"+formatcurrency.format(element.b)+"</td></tr>";

        total = total + +element.b;
        
    });

    table = tableStart + table + tableEnd + "<br><label class='label2'>Total Cost of the budget: " + formatcurrency.format(total) +"</label><br><br><a href=\"Welcome.html\"> Go Back </a><br><br>";

    document.getElementById("main").innerHTML = table;

    //document.getElementsByTagName("table")[1].style.backgroundColor = "#85C1E9";
    //document.getElementsByTagName("table")[1].style.width = "150%";
    //document.getElementsByTagName("table").style.fontStyle='italic';
    

    //document.getElementsByTagName("table")[0].style.class = "table";
   // document.getElementsByTagName("th")[1].style.class = "th";
    




}