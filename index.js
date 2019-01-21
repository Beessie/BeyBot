//-------------require-------------//
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 6000
//--------------------------------//

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({
        status: 'OK'
    }); //on web
    console.log('Get /');
});

app.post('/webhook', (req, res) => {
    console.log('==> POST /webhook');
    res.send({
        status: 'OK',
        body: req.body
    }); //on web
    let body = req.body;
    let events = body.events[0];
    let source = enents.source;
    let message = events.message;
    console.log('==> Body');
    console.log(body);
    console.log('==> source');
    console.log(source);
    console.log('==> message');
    console.log(message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});