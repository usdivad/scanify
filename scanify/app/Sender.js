function Sender(s) {

var UPC_MIN = 8;
var UPC_URL = "https://api.scandit.com/v2/products/";
var UPC_KEY = "Vj5_h2nUpvCcUt0f9l5QS30_1i5HtPgEJPRc3O9jNVp";
var bar;
var bar_arr = s.match(/\d+/g);
for (var i=0; i<bar_arr.length; i++) {
    if (bar_arr[i].length > UPC_MIN) {
        bar = bar_arr[i];
        break;
    }
}
if (bar) {
    getInfo(bar);
}


function getInfo(barcode) {
    //console.log(barcode);
    var url = UPC_URL + barcode + "?key=" + UPC_KEY;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url);
    
    xmlhttp.onreadystatechange = function() {
        //get the text from page
        console.log(xmlhttp.responseText);
    };

    xmlhttp.send();


}


} //end sender