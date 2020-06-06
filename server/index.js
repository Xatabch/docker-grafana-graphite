const express = require('express');
const SDC = require('statsd-client');
const bodyParser = require('body-parser');

const app = express();
const sdc = new SDC({host: 'graphite', port: 8125});

const port = 8001;

app.use(bodyParser.json())

app.post('/gauge', (req, res) => {
    const name = req.body.name;
    const value = req.body.value;

    sdc.gauge(name, value);
    res.status(200).send();
});

app.post('/histogram', (req, res) => {
    const name = req.body.name;
    const value = req.body.value;
    const tag = req.body.tag;

    sdc.histogram(name, value, tag);
    res.status(200).send();
});

app.post('/set', (req, res) => {
    const name = req.body.name;
    const value = req.body.value;

    sdc.set(name, value);
    res.status(200).send();
});

app.post('/raw', (req, res) => {
    const value = req.body.value;

    sdc.raw(value);
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`);
})