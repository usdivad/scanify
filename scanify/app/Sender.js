function Sender(s) {

var UPC_MIN = 8;
var UPC_URL = "http://www.searchupc.com/handlers/upcsearch.ashx?request_type=3";
var UPC_KEY = "3F881381-F5B9-4351-9734-D69493C64116";

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
    var url = UPC_URL + "&upc=" + barcode + "&access_token=" + UPC_KEY;
    
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("GET", url);
    
    // xmlhttp.onreadystatechange = function() {
    //     //get the text from page
    //     console.log(xmlhttp.responseText);
    // };

    // xmlhttp.send();

    // $.getJSON(url, function(data) {
    //     console.log(data);
    // });

    // $.ajax({
    //     url: url,
    //     dataType: "jsonp",
    //     jsonpCallback: "callback",
    //     success: function(data) {
    //         console.log(data);
    //     }
    // })
    console.log("ajax going");
    $.ajax({
        url: "app/getJSON.php",
        type: "POST",
        data: {url: url},
        success: function(data) {
            console.log(data);
        },
    });

}


} //end sender