console.log('starting iot-gateway');

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

client.on('connect', function() {
    setInterval(() => {
        client.publish('device_telemetry', JSON.stringify({
            source: 'device_1',
            timestamp: Date.now(),
            payload: randomIntInc(10,30)
        }));
    }, 1000);
    //client.publish('device_telemetry', 'Hello');
    //client.end();
});

// client.on('message', function (topic, message) {
//     console.log('topic: ' +  topic.toString() + ' message:' + message.toString());
//     client.end();
// });