function Sender(s) {

var UPC_MIN = 8;
var UPC_URL = "https://api.scandit.com/v2/products/";
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
    xmlhttp.open("GET", UPC_URL + barcode + "?key=xnMIfjHmEeSOm5BR8AMNKMhAmYmlilxv5GlU7pBAVbY");
    
    xmlhttp.onreadystatechange = function() {
        //get the text from page
        console.log(xmlhttp.responseText);
    };

    xmlhttp.send();
}


} //end sender