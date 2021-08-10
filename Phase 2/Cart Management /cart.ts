
function aItem(name, price) {

    console.log("Called Add item!");

    let content = {n:name, p:price};

    let spcart = JSON.parse(sessionStorage.getItem("shoppingcart") || "[]");

    spcart.push(content);

    sessionStorage.setItem("shoppingcart", JSON.stringify(spcart));
    
    Totalitems();
}

function Totalitems() {

        let spcart = JSON.parse(sessionStorage.getItem("shoppingcart") || "[]");

     let totitems = spcart.length;
    
         document.getElementById("cartlength").innerHTML = totitems;
}

function dispItem() {

    let spcart = JSON.parse(sessionStorage.getItem("shoppingcart") || "[]");

    
    if (spcart.length == 0) {

        alert("cart is empty")
        
        return;

    }

    var table = "";

    var tableStart = "<table class=\"table table-striped table-dark\"><tr><th scope='col'>Item Name</th><th scope='col'>Price</th></tr>";
    
    var tableEnd = "</table>";
    
    var formatter = new Intl.NumberFormat('en-US', {
        
        style: 'currency',
        
        currency: 'USD'

    });
    
    let totalprice = 0;
    
    spcart.forEach(element => {

        table += "<tr><td>"+element.n+"</td><td>"+formatter.format(element.p)+"</td></tr>";

        totalprice = +totalprice + +element.p;

    });

    table = tableStart + table + tableEnd + "<br><label class='lbl3'>Total price: " + formatter.format(totalprice);

    document.getElementById("check").innerHTML = table;
}