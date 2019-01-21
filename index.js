//-------------require-------------//
const express = require('express');
const app = express();
const PORT = process.env.POST || 6000
//--------------------------------//

app.post('/', (req, res) => {
    res.send({
        status: 'OK'
    }); //on web
    console.log('Get /');
});



app.post('/webhook', (req, res) => {
    res.send({
        status: 'OK'
    }); //on web
    console.log('POST /');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});