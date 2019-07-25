const { ipcRenderer } = require('electron')
getData();
var getData = setInterval(getData, 1000);
var purchases = ["cursors", "grandmas", "farms", "factories", "banks", "temples", "wizardtowers", "shipments", "alchemylabs", "portals", "timemachines", 
"antimatters", "prisms", "chancemakers", "fractalengines"];

function getData(){
    ipcRenderer.send('getData', {});
    
}
ipcRenderer.on("dataHere", function(e, data){
    document.getElementById("cookies").innerHTML = "Cookies: " + data.cookies.toFixed(1);
    document.getElementById("cps").innerHTML = "Cookies Per Sec: " + data.cps;
    var html = "";
    for(var i =0; i<purchases.length; i++){
        html += "<p>"+purchases[i] + ": "+ data[purchases[i]]+"</p>"
    }
    document.getElementById("purchases").innerHTML = html;
})