console.log('starting iot-gateway');

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var device1_send = true;

client.on('connect', function() {

    client.subscribe('device_command');

    setInterval(() => {

        var value = randomIntInc(10,30);

        if(device1_send) {

        console.log("sending telemetry source(device_1) value(" + value + ")");

        client.publish('device_telemetry', JSON.stringify({
            source: 'device_1',
            timestamp: Date.now(),
            payload: value
        }));
        }

        value = randomIntInc(10,30);

        console.log("sending telemetry source(device_2) value(" + value + ")");

        client.publish('device_telemetry', JSON.stringify({
            source: 'device_2',
            timestamp: Date.now(),
            payload: value
        }));

    }, 1000);
});

client.on('message', function(topic, message) {
    var data = JSON.parse(message.toString());
    console.log('topic: ' +  topic.toString() + ' message:' + message.toString());
    console.log('device: ' + data.target + ' data: ' + data.payload);

    if(data.target === 'device_1') {
        
        device1_send = !device1_send;
        console.log('state ' + device1_send);
    }

});


// client.on('message', function (topic, message) {
//     console.log('topic: ' +  topic.toString() + ' message:' + message.toString());
//     client.end();
// });