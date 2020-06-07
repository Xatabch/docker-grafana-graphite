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

app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`);
})