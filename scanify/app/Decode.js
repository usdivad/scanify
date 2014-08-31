function Decode() {

var takePicture = document.querySelector("#Take-Picture"),
            showPicture = document.querySelector("#picture");
            Result = document.querySelector("#textbit");
            Canvas = document.createElement("canvas");
            Canvas.width=640;
            Canvas.height=480;
            var resultArray = [];
            ctx = Canvas.getContext("2d");
            var workerCount = 0;
            function receiveMessage(e) {
                if(e.data.success === "log") {
                    console.log(e.data.result);
                    return;
                }
                if(e.data.finished) {
                    workerCount--;
                    if(workerCount) {
                        if(resultArray.length == 0) {
                            DecodeWorker.postMessage({ImageData: ctx.getImageData(0,0,Canvas.width,Canvas.height).data, Width: Canvas.width, Height: Canvas.height, cmd: "flip"});
                        } else {
                            workerCount--;
                        }
                    }
                }
                if(e.data.success){
                    var tempArray = e.data.result;
                    for(var i = 0; i < tempArray.length; i++) {
                        if(resultArray.indexOf(tempArray[i]) == -1) {
                            resultArray.push(tempArray[i]);
                        }
                    }
                    Result.innerHTML=resultArray.join("<br />");
                }else{
                    if(resultArray.length === 0 && workerCount === 0) {
                        Result.innerHTML="Decoding failed.";
                    }
                }
            }
            var DecodeWorker = new Worker("lib/DecoderWorker.js");
            DecodeWorker.onmessage = receiveMessage;
            if(takePicture && showPicture) {
                takePicture.onchange = function (event) {
                    var files = event.target.files
                    if (files && files.length > 0) {
                        file = files[0];
                        // try {
                        //     var URL = window.URL || window.webkitURL;
                        //     var imgURL = URL.createObjectURL(file);
                        //     showPicture.src = imgURL;
                        //     URL.revokeObjectURL(imgURL);
                        //     //showPicture.Jcrop();
                        //     DecodeBar()
                        // }
                        
                        // catch (e) {
                            try {
                                var fileReader = new FileReader();
                                fileReader.onload = function (event) {
                                    showPicture.src = event.target.result;
                                    $("#picture").attr("src", fileReader.result);
                                    $("#picture").Jcrop({
                                        onSelect: getCoords
                                    });
                                    console.log("asdf");
                                };
                                fileReader.readAsDataURL(file);
                                //DecodeBar()
                            }
                            catch (e) {
                                Result.innerHTML = "Neither createObjectURL or FileReader are supported";
                            }
                        }
                    // }
                };
            }
            function getCoords(c) {
                console.log([c.x, c.y, c.x2, c.y2, c.w, c.h].join(", "));
            }
            function DecodeBar(){
                showPicture.onload = function(){
                    ctx.drawImage(showPicture,0,0,Canvas.width,Canvas.height);
                    resultArray = [];
                    workerCount = 2;
                    Result.innerHTML="";
                    DecodeWorker.postMessage({ImageData: ctx.getImageData(0,0,Canvas.width,Canvas.height).data, Width: Canvas.width, Height: Canvas.height, cmd: "normal"});
                    //$("#picture").Jcrop();
                }
            }
}