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
    console.log('==> Body');
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});