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
        series: [
            {
                name: 'device_1',
                data: []
            },
            {
                name: 'device_2',
                data: []
            }
        ]
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

        if(data.source === 'device_1') {
            chart.series[0].addPoint(data.payload);
        } else if(data.source === 'device_2') {
            chart.series[1].addPoint(data.payload);
        }
    //client.end();
    });

    $('#button1').click(function() {
        console.log('click');

        client.publish('device_command', JSON.stringify({
            target: 'device_1',
            timestamp: Date.now(),
            payload: 'reduce_cycle'
        }));
    });


});