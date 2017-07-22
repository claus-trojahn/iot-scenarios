console.log('starting iot-dashboard');

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function() {
    client.subscribe('device_telemetry');
});

client.on('message', function (topic, message) {
    var data = JSON.parse(message.toString());
    console.log('topic: ' +  topic.toString() + ' message:' + message.toString());
    console.log('device: ' + data.source + ' data: ' + data.payload);
    //client.end();
});