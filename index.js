//-------------require-------------//
const express = require('express');
var bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
//--------------------------------//

//-------------Intitial-------------//
const app = express();
const PORT = process.env.PORT || 6000
const client = new line.Client({
    channelAccessToken: 'wgu+sZ9/wYk8UsMIvKlyXmh2bVoByDleEtHkMW0c6BafJmJunG/fKtUg0CDB2X4KEwWrzsjOoFSqD8oh29e9XTUqVq3TGInXF96HJve65hTtFo24OXbTAh1jFdaPTKiWmgygY3W9rtMZkOec1IFsogdB04t89/1O/w1cDnyilFU='
});
//--------------------------------//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send({
        status: 'OK'
    }); //on web
    console.log('Get /');
});
//-------------------------------//


//------------for connect line---------------//
app.get('/', (req, res) => {
    console.log("Get/ ");
    res.send({status: "OK", data: datafirebase});
});

app.post('/webhook', (req, res) => {
    console.log('==> POST /webhook');
    let body = req.body;
    console.log('[Body] ==>');
    console.log(body);

    if(req.body && body.events){
        let events = body.events[0];
        let type = events.type;
        let source = events.source;
        let message = events.message;
        let replyToken = events.replyToken;

        console.log('[source] ==>');
        console.log(source);
        console.log('[message] ==>');
        console.log(message);
        console.log('[type] ==>');
        console.log(type);
        console.log('[replyToken] ==>');
        console.log(replyToken);
        
        switch (type) {
            
            //Event--> Text, Sticker
            case 'message':
            let type = message.type;
                console.log(`[message.type] ==>  ${type}`);
            let id = message.id;
            
            if(type == 'text'){
                let text = message.text;
                    console.log(`[text] ==>`);

                const messageRespone = [ 
                    {
                        type: 'text',
                        text: 'HELLO'
                    },
                    {
                        type: 'sticker',
                        // id: '9219905739474',
                        packageId: '4',
                        stickerId: '1'
                    }
                ];
                replyMessage(replyToken, messageRespone);

            }else if(type == 'sticker'){
                let stickerId = message.stickerId;
                let packageId = message.packageId;

                replyMessage(replyToken, message);
            }
            break;

            //Event-->UnFriend(Unfllow) or block
            case 'unfollow':
                message = {
                    type: 'text',
                    text: 'Unfriend Why?'
                };
                replyMessage(replyToken, message);
                break;

            //Event-->UnFriend(Unfllow) or block
            case 'follow':
                message = {
                    type: 'text',
                    text: 'add friend'
                };
                replyMessage(replyToken, message);
                break;

            default:
                break;
        
        }
    }
    
    res.send({
        status: 'OK',
        body: req.body
    }); //on web

});

//-------------Function------------------//
const replyMessage = (replyToken, message) => {
    console.log(`[replyMessage] :: [replyToken]: ${replyToken}, message: ${message})`);
    client.replyMessage(replyToken, message)
        .then(() => {
            console.log(`Reply Successfully!`);
        })
        .catch((err) => {
            console.log(`Error is error: ${err}`);
        });
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
