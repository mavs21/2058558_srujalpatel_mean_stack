function addPost() {

    var title = document.getElementById("title").value;

    var article = document.getElementById("article").value;

    var img = document.getElementById("img").value;

    var blogpost = JSON.parse(sessionStorage.getItem("blogpost") || "[]");
     var bpost = {t:title,a:article,i:img};

     blogpost.unshift(bpost);

     sessionStorage.setItem("blogpost", JSON.stringify(blogpost));

     blogpost = JSON.parse(sessionStorage.getItem("blogpost") || "[]");

        displayData();
    
         alert("Successfully Added");
    
}

function displayData() {

    var blogpost = JSON.parse(sessionStorage.getItem("blogpost") || "[]");

    if (blogpost) {
        var cont = "";

        blogpost.forEach(element => {
            cont += "<div class=\"col-md-3 blogpost\"><h3>" + element.t + "</h3>";

            cont += "<label>" + element.a + "</label>";

            if (element.i.length > 0) {
                cont += "<img src=\"" + element.i + "\" class=\"img-thumbnail\"></div><br>";
            }

        });

        document.getElementById("blogposts").innerHTML = cont;
    }
}