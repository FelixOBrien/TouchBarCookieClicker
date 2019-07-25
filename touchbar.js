const { app, BrowserWindow, TouchBar, ipcMain } = require('electron')
const fs = require('fs');
const path = require('path');
const { TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarScrubber} = TouchBar;
const userData = app.getAppPath("userData");
const jsonPath = path.join(userData, "cookiejson.json");

var cookieJson = get();
var purchases = ["cursors", "grandmas", "farms", "factories", "banks", "temples", "wizardtowers", "shipments", "alchemylabs", "portals", "timemachines", 
"antimatters", "prisms", "chancemakers", "fractalengines"];
var costs = [15, 100, 1100, 12000, 130000,1400000, 20000000, 330000000, 5100000000, 75000000000, 1000000000000, 14000000000000, 170000000000000, 
    2.1*Math.pow(10, 15), 26*Math.pow(10, 15), 310*Math.pow(10, 15) ];
var perSecond = [0.1, 1, 8, 47, 260, 1400, 7800, 44000, 260000, 1600000, 10000000, 65000000, 430000000, 2900000000, 21000000000, 150000000000];

// Reel labels

const cookieText = new TouchBarLabel()
cookieText.label = "0 Cookies"
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const cookie = new TouchBarButton({
  label: '🍪 Click',
  backgroundColor: '#286A8D',
  click: () => {
    cookieJson.cookies+=1;
    update();
  }
})
const statusText = new TouchBarLabel({
    label: "Status",
    textColor: "#20FF58"
})
const cursor = new TouchBarButton({
    label: 'Cursor',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(0, "cursors");
    }
})
const grandma = new TouchBarButton({
    label: 'Grandma',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(1, "grandmas");
    }
})
const farm = new TouchBarButton({
    label: 'Farm',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(2, "farm");
    }
})
const mine = new TouchBarButton({
    label: 'Mine',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(3, "mine");
    }
})
const factory = new TouchBarButton({
    label: 'Factory',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(4, "factory");
    }
})
const bank = new TouchBarButton({
    label: 'Bank',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(5, "bank");
    }
})
const temple = new TouchBarButton({
    label: 'Temple',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(6, "temple");
    }
})
const wizardTower = new TouchBarButton({
    label: 'Wizard Tower',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(7, "wizardtowers");
    }
})
const shipment = new TouchBarButton({
    label: 'Shipment',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(8, "shipments");
    }
})
const alchemylab = new TouchBarButton({
    label: 'Alchemy Lab',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(9, "alchemylabs");
    }
})
const portal = new TouchBarButton({
    label: 'Portal',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(10, "portals");
    }
})
const timemachine = new TouchBarButton({
    label: 'Time Machine',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(11, "timemachines");
    }
})
const antimattercondenser = new TouchBarButton({
    label: 'Antimatter Condenser',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(12, "antimatters");
    }
})
const prism = new TouchBarButton({
    label: 'Prism',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(13, "prisms");
    }
})
const chancemaker = new TouchBarButton({
    label: 'Chancemaker',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(14, "chancemakers");
    }
})
const fractalengine = new TouchBarButton({
    label: 'Fractal Engine',
    backgroundColor: "#ffffff",
    click: () => {
        updateJson(15, "fractalengines");
    }
})
const scrubber = new TouchBarScrubber({
    items: [cursor, grandma, farm, factory, bank, temple, wizardTower, shipment, alchemylab, portal, timemachine, antimattercondenser, prism, chancemaker,
    fractalengine],
    highlight: (i) =>{
        var cost = getCost(costs[i], cookieJson[purchases[i]]);
        if(cookieJson.cookies >= cost){
            cookieJson.cookies -= cost;
            statusText.label = "Purchased!";
            statusText.textColor = "#20FF58";
        updateJson(i, purchases[i]);
        }else{
            statusText.label = "Need Money";
            statusText.textColor = "#ff5151";
        }
    }
})
function updateJson(cps, name){
    cookieJson.cps += perSecond[cps];
    cookieJson[name]++;
    
}
const update = () => {
  cookieText.label = parseInt(cookieJson.cookies) + " Cookies";
}
function get(){
    try{
        return JSON.parse(fs.readFileSync(jsonPath));
    }catch(e){
        return {cookies: 0, cps: 0, cursors: 0, grandmas: 0, farms: 0, factories: 0, banks: 0, temples: 0, wizardtowers: 0, shipments: 0, alchemylabs: 0, 
        portals: 0, timemachines: 0, antimatters: 0, prisms: 0, chancemakers: 0, fractalengines: 0
        }; 
    }
}
function getCost(originalCost, amount){
    return originalCost  * Math.pow(1.15, amount);
}
var cookiePerSecond = setInterval(() => {
    cookieJson.cookies += cookieJson.cps;
    update();
}, 1000);
var saving = setInterval(save, 10000);
function save(){
       fs.writeFileSync(jsonPath, JSON.stringify(cookieJson));


}
const touchBar = new TouchBar({
  items: [
    cookie,
    new TouchBarSpacer({ size: 'small' }),
    cookieText,
    new TouchBarSpacer({size: 'small'}),
    statusText,
    new TouchBarSpacer({size: 'large'}),
    scrubber,

  ]
})


let window

app.once('ready', () => {
  window = new BrowserWindow({
    frame: true,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    webPreferences: {
        nodeIntegration: true
    }
  })
  window.loadURL('file:///' + path.join(__dirname, 'index.html'))

  window.setTouchBar(touchBar)
})
ipcMain.on("getData", function(e, arg){

    window.webContents.send('dataHere', cookieJson);
});