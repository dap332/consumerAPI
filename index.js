"use strict";
const server = require('express')();
const bodyparser = require('body-parser');

const producer = require('./producer');
const PORT = 80;

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: false}));

server.get('/', (req, res) =>{
    res.send(`<h1> Hello </h1>`);
});

server.post('/', (req, res) => {
    let topic;
    let data;
    try {
        topic = JSON.parse(JSON.stringify(req.body.topic));
        data = JSON.parse(JSON.stringify(req.body.data));
        console.log('received message');
        producer.produce(topic, data)
            .then(data => res.end('ok'))
            .catch(err => (res.send(new Error(err))));

    }catch (e) {
        res.send("error" + req.body);
        throw e;
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});