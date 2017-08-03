const fs = require('fs');
const mqtt = require('mqtt');

let config;
let client;

var content = fs.readFileSync("gateway-config.json",'utf8');
if(content) {
    config = JSON.parse(content);;
}

// check whether we have a config
if(config) {

    console.log("[gateway] configuration");

    // initialize devices
    for(var i=0; i<config.devices.length; i++) {
        console.log("[gateway] initialize device: '" + config.devices[i].name);
        // set the enabled flag to true so that device data will be 
        // sent from the gateway to the hub
        config.devices[i].enabled = true;
    }

    console.log("[gateway] connecting to: " + config.broker);

    client = mqtt.connect('mqtt://test.mosquitto.org');


} else {
    return 1;
}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

client.on('connect', function() {

    console.log("[gateway] connected");

    client.subscribe('device_command');

    setInterval(() => {

        for(var i=0; i<config.devices.length; i++) {
            var device = config.devices[i];
            if(device.enabled) {
                var value = randomIntInc(10,30);     
                console.log("sending telemetry source(" + device.name + ") value(" + value + ")");

                client.publish('device_telemetry', JSON.stringify({
                    source: device.name,
                    timestamp: Date.now(),
                    payload: value
                }));                
            }
        }

    }, 1000);
});

client.on('message', function(topic, message) {
    // parse message to device command
    var data = JSON.parse(message.toString());
    console.log('topic: ' +  topic.toString() + ' message:' + message.toString());
    console.log('device: ' + data.target + ' data: ' + data.payload);

    dispatch_device_sate(data.target);
});

function dispatch_device_sate(target) {
    for(var i=0; i<config.devices.length; i++) {
        if(config.devices[i].name === target) {
            config.devices[i].enabled = !config.devices[i].enabled;
            break;
        }
    }
}
