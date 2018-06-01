/**
 * Created by I853934 on 5/22/2018.
 */
//Uses kafka-node module to connect to zookeeper.
//npm i kafka-node
const kafka = require('kafka-node'),
    //dns to connect to zookeeper
    //since cluster ip can change if svc goes down we use dns
    //dns is found using <svc-name>.<namespace>.svc.cluster.local
    client = new kafka.Client("zookeeper.kubeless.svc.cluster.local:2181");
producer = new kafka.Producer(client);
console.log("readying producer...");
producer.on('ready', () => {
    console.log('kafka conn is ready to push to');
})

producer.on('error', (err) => {
    console.log(err);
    throw err;
})


//why is this executing everytime, I thought this would only run once since it is outside the handle
console.log('Client connected');

exports.produce = (topic, data) => {

    payloads = [{topic: topic, messages: data, partition: 0}];

    return new Promise((resolve, reject) => {
        producer.on('error', (err)=> {
            reject(err);
        });


        producer.send(payloads, (err, data) => {
            if(err) reject(err);
            // client.close(() => {
            console.log('sent msg');
            resolve('sent msg');
            //});
        });
    });

};

