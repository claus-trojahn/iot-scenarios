console.log('starting iot-dashboard');

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
// var mqtt = require('mqtt');
// var client = mqtt.connect('mqtt://test.mosquitto.org');

// client.on('connect', function() {
//     client.subscribe('device_telemetry');
// });

// client.on('message', function (topic, message) {
//     var data = JSON.parse(message.toString());
//     console.log('topic: ' +  topic.toString() + ' message:' + message.toString());
//     console.log('device: ' + data.source + ' data: ' + data.payload);
//     //client.end();
// });

let win;

function createWindow() {
    win = new BrowserWindow({
        title: 'IoT Dashboard',
        width: 1024,
        height: 768
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'app/dashboard.html'),
            protocol: 'file',
            slashes: true
        }));
        
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

// create the initial window of application
app.on('ready', () => {
    // create the window
    createWindow();

});