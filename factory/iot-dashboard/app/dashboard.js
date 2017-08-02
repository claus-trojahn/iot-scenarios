//const $ = require('jquery');
const Highcharts = require('highcharts');
const mqtt = require('mqtt');

$(document).ready(() => {
    
    console.log('ready');

       var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            //type: 'bar'
        },
        title: {
            text: 'Device Temperature'
        },
        yAxis: {
            title: {
                text: 'temp'
            }
        },
        xAxis: {
            title: {
                text: 'time'
            }
        },
        series: [{
            name: 'temp',
            data: []
        }]
    }); 

    var client = mqtt.connect('mqtt://test.mosquitto.org');

    client.on('connect', function() {
        client.subscribe('device_telemetry');
    });

    client.on('message', function (topic, message) {
        var data = JSON.parse(message.toString());
        console.log('topic: ' +  topic.toString() + ' message:' + message.toString());
        console.log('device: ' + data.source + ' data: ' + data.payload);

        //$('#container').append(data.payload + '<br/>');

        chart.series[0].addPoint(data.payload);

    //client.end();
    });

});