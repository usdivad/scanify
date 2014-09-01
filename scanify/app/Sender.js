function Sender(s) {

var UPC_MIN = 8;
var UPC_URL = "http://www.upcdatabase.com/item/";
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
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", UPC_URL + barcode);
    
    xmlhttp.onreadystatechange = function() {
        //get the text from page
    };

    xmlhttp.send();
}


} //end sender