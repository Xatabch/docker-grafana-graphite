const express = require('express');
const app = express();
const {exec} = require('child_process');
const port = 8000;

app.get('/test_metrics', (req, res) => {
    exec('echo "deploys.test.myservice:1|c" | nc -w 1 -u 127.0.0.1 8125', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
          } else {
           // the *entire* stdout and stderr (buffered)
           console.log(`stdout: ${stdout}`);
           console.log(`stderr: ${stderr}`);
          }
    })
});

app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`)
});