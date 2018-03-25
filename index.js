'use strict';

const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')

const text          = require('./lib/text.js')
const helper        = require('./lib/helper.js')

var bleacherbot = "http://bleacherbot.4bleacherreport.com";

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot');
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});

app.post('/webhook/', function(req, res) {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i];
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text.toLowerCase();
            if (text.acceptable_greetings.indexOf(text) !== -1) {
                // respond to a greeting
                helper.sendTextMessage(sender, helper.randomOption(text.greeting_responses));
                continue;
            }else if (text.appreciation_messages.indexOf(text) !== -1) {
                // respond to an appreciation
                helper.sendTextMessage(sender, helper.randomOption(text.appreciation_responses));
            } else if (text.length < 3) {
                helper.sendTextMessage(sender, "Please be more specific!")
            } else if (text === "help") {
                helper.sendTextMessage(sender, helper.randomOption(text.help_messages));
            } else if (text === "settings") {
                sendSettingsMessage(sender);
            } else if (text === "file") {
                sendFile(sender);
            }
            else if (text.slice(text.length - 6, text.length) === "scores") {
                var league = text.slice(0, text.length - 7).toUpperCase();
                var team = null;
                if (league.length > 3) {
                    var team = league.toLowerCase().replace(/\s+/g, '-');
                    var league = null;
                }
                // helper.sendTextMessage(sender, interest)
                helper.sendScoreMessage(sender, league, team);
            }
             else {
                // THIS IS THE CORE message type
                helper.getPossibilities(sender, text)
            }
        }
        if (event.postback) {
            helper.receivedPostback(event);
            continue;
        }
    }
    res.sendStatus(200);
});
