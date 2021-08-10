function aItem(name, price) {
    console.log("Called Add item!");
    var content = { n: name, p: price };
    var spcart = JSON.parse(sessionStorage.getItem("shoppingcart") || "[]");
    spcart.push(content);
    sessionStorage.setItem("shoppingcart", JSON.stringify(spcart));
    Totalitems();
}
function Totalitems() {
    var spcart = JSON.parse(sessionStorage.getItem("shoppingcart") || "[]");
    var totitems = spcart.length;
    document.getElementById("cartlength").innerHTML = totitems;
}
function dispItem() {
    var spcart = JSON.parse(sessionStorage.getItem("shoppingcart") || "[]");
    if (spcart.length == 0) {
        alert("cart is empty");
        return;
    }
    var table = "";
    var tableStart = "<table class=\"table table-striped table-dark\"><tr><th scope='col'>Item Name</th><th scope='col'>Price</th></tr>";
    var tableEnd = "</table>";
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    var totalprice = 0;
    spcart.forEach(function (element) {
        table += "<tr><td>" + element.n + "</td><td>" + formatter.format(element.p) + "</td></tr>";
        totalprice = +totalprice + +element.p;
    });
    table = tableStart + table + tableEnd + "<br><label class='lbl3'>Total price: " + formatter.format(totalprice);
    document.getElementById("check").innerHTML = table;
}
