function Sender(s) {

var UPC_MIN = 8;
//scandit
var UPC_URL = "https://api.scandit.com/v2/products/"
var UPC_KEY = "Vj5_h2nUpvCcUt0f9l5QS30_1i5HtPgEJPRc3O9jNVp";

//searchupc
// var UPC_URL = "http://www.searchupc.com/handlers/upcsearch.ashx?request_type=3";
// var UPC_KEY = "3F881381-F5B9-4351-9734-D69493C64116";

var bar;
var bar_arr = s.match(/\d+/g);
for (var i=0; i<bar_arr.length; i++) {
    if (bar_arr[i].length > UPC_MIN) {
        bar = bar_arr[i];
        break;
    }
}
if (bar) {
    //console.log(bar);
    getInfo(bar);
}


function getInfo(barcode) {
    //console.log(barcode);
    var url = UPC_URL + barcode + "?key=" + UPC_KEY; //scandit
    // var url = UPC_URL + "&upc=" + barcode + "&access_token=" + UPC_KEY; //searchupc
    
    //naive xmlhttp approach
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("GET", url);
    // xmlhttp.onreadystatechange = function() {
    //     //get the text from page
    //     console.log(xmlhttp.responseText);
    // };
    // xmlhttp.send();

    console.log("ajax going");
    $.ajax({
        url: "app/getJSON.php",
        type: "POST",
        data: {url: url},
        success: function(data) {
            //console.log(data);
            
            //scandit data
            var name = "";
            var category = "";
            if (data["basic"]) {
                var basic = data["basic"];
                if (basic["name"]) {
                    name = basic["name"];
                }
                if (basic["category"]) {
                    category = basic["category"];
                }
            }

            //display
            var textbit = $("#textbit");
            var original_html = textbit.html();
            textbit.html(original_html + "<br>name: " + name + "<br>category: " + category);
        }
    });

}


} //end sender