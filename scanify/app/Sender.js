function Sender(s) {
    var UPC_MIN = 8;
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
}

function getInfo(barcode) {
    console.log(barcode);
}