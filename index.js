"use strict";
const server = require('express')();
const bodyparser = require('body-parser');

const PORT = 80;

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: false}));

server.get('/', (req, res) =>{
    res.send(`<h1> Hello </h1>`);
});

server.get('/foo', (req, res) =>{
    res.send(`<h1> FOO </h1>`);
});


server.post('/', (req, res) => {
    try {
        let data = JSON.parse(JSON.stringify(req.body));

        res.end('ok');
    }catch (e) {
        res.send("error" + req.body);
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});