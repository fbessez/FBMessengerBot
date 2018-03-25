'use strict';

const text          = require('./text.js')
var fetch           = require('fetch').fetchUrl;
const request       = require('request')
const config        = require('./config.js')


function sendTextMessage(sender, text) {
    let messageData = MessageData("text", text);
    facebookRequestMethod(sender, messageData);
}

function sendCarouselMessage(sender, input, i, offset) {
    var offset = offset || 0;
    // sender == user_id
    // input == interest e.g Kyrie Irving
    // i = the number offset you want
    var service_url = bleacherbot + "/tracks/?permalinks=" + input;
    // djay_url is for the cache of stories
    fetch(service_url, function(error, meta, body) {
        // fetching it returns a body that we then JSONify and store as data
        var j = i + 4;
        let data = JSON.parse(body);
        if (data.tracks === "not good enough") {
            return sendTextMessage(sender, "This option is no longer available ... so sorry");
        } else {
                // get content for the carousel and store in text array which we will then pass
                // to facebook generic template
            var text = [];
            for (i; i < j; i++) {
                text[i] = {
                        "title": data.tracks[i].title,
                        "item_url": data.tracks[i].item_url,
                        "subtitle": data.tracks[i].subtitle,
                        "image_url": data.tracks[i].image_url,
                        "buttons": [{
                            "type": "postback",
                            "title": "Share",
                            "payload": "share" + data.tracks[i].title + " " + data.tracks[i].item_url
                        }]
                    };
                if (text[i].item_url.slice(0,4) !== "http") {
                    text[i].item_url = "bleacherreport.com" + data.tracks[i].permalink;
                }
            }
            //  if i === 4 and if person is already subscribed -->
            // then make sure that the subscribe button is changed to an unsubscribe button
            if (i === 4) {
                // this is a case when a user has already requested to "see more" --> get TeamStream
                text.push(messageTemplates("see more", input));
            } else if (i === 8) {
                text.push(messageTemplates("no more", input));
            }
        }
        while (text[0] === undefined) {
            // THIS is for when you ask to see more
            text.shift();
        }

        var textJSON = JSON.stringify(text);
        let messageData = MessageData("generic_template", textJSON);
        facebookRequestMethod(sender, messageData);
        // // insert check here that checks if the current user has already
        // // subscribed to the particular stream
        // sendSubscribeMessage(sender, input);
    });
}

function sendPushMessage(sender, input){
    var service_url = bleacherbot + "/pushnotifications/?permalinks=" + input;
    fetch(service_url, function(error, meta, body) {
        let data = JSON.parse(body);
        var text = data.push_notifications[0].message;
        // var d = new Date(APIdata[0].created_at).toLocaleTimeString()
        sendTextMessage(sender, text); // + "\nSent at: " + d);
    });
    // sendTextMessage(sender, "Download our Team Stream App...you will be very impressed!");
}

function sendSubscribeMessage(sender, input) {
    input = input.replace(/-/g, ' ');
    let messageData = messageTemplates("subscribe", input);
    facebookRequestMethod(sender, messageData);
}

function facebookRequestMethod(sender, messageData) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: config.token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function getPossibilities(sender, input, tagUrl) {
    if (tagUrl === undefined) {
        input = input.replace(/\s+/g, '-');
        var tagUrl = bleacherbot + "/tags/?tags=" + input;
    }
    fetch(tagUrl, function(error, meta, body) {
        let data = JSON.parse(body);
        var text = data.tags;
        if (data.tags === "invalid input" || text.length === 0 || data.tags === "not good enough") {
            sendTextMessage(sender, randomOption(text.apologies));
            return sendGif(sender, "http://i.giphy.com/rvDtLCABDMaqY.gif");
        }
        sendTextMessage(sender, randomOption(text.stalling_messages))
        for (var j = 0; j < text.length; j++){
            if (text[j].permalink === input) {
                return sendCarouselMessage(sender, input, 0);
            }
        }
        displayPossibilities(sender, text);
    });
}

function sendScoreMessage(sender, league, team) {
    if (league === null && team === null) {
        sendTextMessage(sender, "please type 'league/team' and then 'scores'");
    } else if (league === null && team !== null) {
        var score_url = bleacherbot + "/scores/?team=" + team;
    } else if (league !== null && team !== null) {
        var score_url = bleacherbot + "/scores/?team=" + team;
    } else {  // league !== null && team === null
        var score_url = bleacherbot + "/scores/?league=" + league;
    }


     fetch(score_url, function(error, meta,body) {
         let data = JSON.parse(body);
         if (data.games !== "No Games!") {
            var text = [];
            var objectCount = data.games.length;
            if (objectCount > 8) {
                sendTextMessage(sender, "Dude! You weren't specific enough...smh. But we still got you this...");
                sendTextMessage(sender, "Today's Games:");
                objectCount = 8;
            }
            for (var i = 0; i < objectCount; i++) {
                text[i] = {
                    "title": data.games[i].valuables.current_score,
                    "item_url": "http://bleacherreport.com/" + (league || team),
                    "subtitle": data.games[i].valuables.teams,
                    "image_url": data.games[i].awayTeamInfo.awayLogo,
                };
            }
            var textJSON = JSON.stringify(text);
            let messageData = MessageData("generic_template", textJSON);
            facebookRequestMethod(sender, messageData);
        }
        else {
            sendTextMessage(sender, "Sorry, but there are no games!");
        }
     })
}

function displayPossibilities(sender, tagdata) {
    var objectCount = tagdata.length;
    if (objectCount >= 10) {
        sendTextMessage(sender, "Your query came back with so many results... so here is just a few. Be more specific for better results");
        objectCount = 8;
    }
    var text = [];
    for (var i = 0; i < objectCount; i++) {
            // next step make it so only content-worthy objects appear in carousel
            text.push({
                "title": "x",
                "image_url": "http://www.iamjasonso.com/img/teamstream-thumbnail.jpg",
                "subtitle": "Are you looking for this?",
                "buttons": [{
                    "type": "postback",
                    "title": "Click me!",
                    "payload": "choose" + tagdata[i].permalink,
                }, {
                    "type": "postback",
                    "title": "See Related Streams",
                    "payload": "parent " + tagdata[i].permalink,
                },
                // if tagdata[i].type === team or league.
                // then append this onto text[i] if possible!?
                // this would make it so that if i search cleveland cavs
                // it would give you an option to check scores...
                // {
                //     "type": "postback",
                //     "title": "Scores",
                //     "payload": "score" + tagdata[i].permalink
                // }
                ]
            });
            text[i].title = tagdata[i].name;
            text[i].image_url = tagdata[i].logo_filename;
    }
    var textJSON = JSON.stringify(text);
    let messageData = MessageData("generic_template", textJSON);
    facebookRequestMethod(sender, messageData);
}

function getRelatedStreams(sender, permalink) {
    var tagUrl = bleacherbot + "/tags/?tags=" + permalink;
    fetch(tagUrl, function(error,meta,body) {
        let data = JSON.parse(body);
        var parentUrl = data.tags[0].links.parent;
            if (parentUrl === null) {
                return sendTextMessage(sender, "Sorry, but that's all of the relations we've got!");
            }
        getPossibilities(sender, permalink, bleacherbot + "/tags?tags=" + permalink + "&r=parent")
    })
}

function receivedPostback(event) {
    var sender = event.sender.id;
    var recipient = event.recipient.id;
    var timeOfPostBack = event.timestamp;
    var payload = event.postback.payload;

    console.log("Received postback for user %d and page %d with payload '%s' " +
     "at %d", sender, recipient, payload, timeOfPostBack);

    if (payload.slice(0,8) === "see more") {
        sendCarouselMessage(sender, payload.slice(9, payload.length), 4);
    }

    else if (payload.slice(0,9) === "Subscribe") {
        sendSubscribeMessage(sender, payload.slice(9, payload.length))
        // sendTextMessage(sender, "update database...");
        // Update database with senderID, Subscriptions, Quiet Time...
        // subscription key word === payload.slice(10, payload.length) ex. Payload = Subscribe Kevin Love
        // Sign up for newsletter?
    } else if (payload.slice(0, 11) === "unsubscribe") {
        sendTextMessage(sender, "Update db and erase the unique name in the rest of the payload")
    }
    else if (payload.slice(0,6) === "choose") {
        sendCarouselMessage(sender, payload.slice(6, payload.length), 0);
    }
    else if (payload.slice(0,4) === "push") {
       // sendTextMessage(sender, payload.slice(5,payload.length));
        sendPushMessage(sender, payload.slice(5, payload.length));
    }
    else if (payload.slice(0, 6) === "parent") {
        // sendTextMessage(sender, payload.slice(8,payload.length));
        getRelatedStreams(sender, payload.slice(7, payload.length));
    } else if (payload.slice(0,4) === "menu") {
        menuHandling(sender, payload);
    }
    else if (payload.slice(0,8) === "greeting") {
        sendTextMessage(sender, payload.slice(8, payload.length))
    }
    else if (payload.slice(0,5) === "share"){
        sendTextMessage(sender, payload.slice(5, payload.length))
    }
    else {
        sendTextMessage(sender, "Something went wrong :(" + payload);
    }
}

function menuHandling(sender, payload) {
    var truePayload = payload.slice(5, payload.length);
    if (truePayload === "help") {
        sendTextMessage(sender, randomOption(text.help_messages));
    } else if (truePayload === "trending") {
        sendCarouselMessage(sender, truePayload, 0);
    } else if (truePayload === "qr") {
        quickReply(sender);
    } else if (truePayload === "scores") {
         sendTextMessage(sender, "Get my followed teams...and then just call sendScoresMessage with teampermalink,teampermalink...");
    }
}

function quickReply(sender) {
    // so... each "title" field should hold the display name of a followed team
    // it's like a 15 character limit for qr button title though.
    // payload should then be the unique_name/permalink of that team/player/stream
    //
    let messageData = messageTemplates("myteams")
    facebookRequestMethod(sender, messageData)
}

function sendGif(sender, url) {
    let messageData = {
    "attachment":{
      "type":"image",
      "payload":{
        "url": url
      }
    }
  };
  facebookRequestMethod(sender, messageData)
}

function sendFile(sender) {
    let messageData = {
        "attachment": {
            "type": "file",
            "payload": {
                "url": "https://media.pragprog.com/titles/phoenix/queries.pdf"
            }
        }
    };
    facebookRequestMethod(sender, messageData)
}

function randomOption(list_of_options) {
    var option = list_of_options[Math.floor(Math.random() * list_of_options.length)];
    return option
}

function messageTemplates(purpose, input) {
    if (input === null) {
        input = "";
    }
    if (purpose === "see more") {
        return {
            "title": "Looking for more great stories?",
            "image_url": "http://www.sportsnexus.in/wp-content/uploads/2016/02/team-stream.jpg",
            "subtitle": "Just tap below 😘",
            "buttons": [{
                "type": "postback",
                "title": "See More",
                "payload": "see more " + input,
            },{
                "type": "web_url",
                "url": "https://itunes.apple.com/us/app/team-stream/id418075935?mt=8",
                "title": "Download Team Stream"
            }, {
                "type": "postback",
                "title": "Subscribe",
                "payload": "Subscribe" + input
            },]
        }
    } else if (purpose === "no more") {
        return {
            "title": "Still want more?",
            "image_url": "http://www.sportsnexus.in/wp-content/uploads/2016/02/team-stream.jpg",
            "subtitle": "Download Team Stream!",
            "buttons": [
            {
                "type": "web_url",
                "url": "https://itunes.apple.com/us/app/team-stream/id418075935?mt=8",
                "title": "Download Team Stream"
            }, {
                "type": "postback",
                "title": "Subscribe",
                "payload": "Subscribe" + input
            }, {
                "type": "postback",
                "title": "LastPushNotification",
                "payload": "push " + input,
            }]
        }
    } else if (purpose === "subscribe") {
       return     {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Just making sure...you wanna subscribe to " + input + ", right?",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Yeah",
                        "payload": "verify_subscribe"
                    }, {
                        "type": "postback",
                        "title": "Nah",
                        "payload": "nah"
                    }
                ]
                }
            }
        };
    } else if (purpose === "myteams") {
        return {
            "text":"Pick a stream:",
            "quick_replies":[
            {
                "content_type":"text",
                "title":"Golden State",
                "payload": "menu golden-state-warriors"
            }, {
                "content_type":"text",
                "title":"Knicks",
                "payload":"menu new-york-knicks"
            }, {
                "content_type":"text",
                "title":"Trending",
                "payload":"menu trending"
            }, {
                "content_type":"text",
                "title":"NBA Rumors",
                "payload":"menu nba-rumors"
            }, {
                "content_type": "text",
                "title": "Cold Hard Facts",
                "payload": "menu qr"
            }
        ]}
    }
}

function MessageData(purpose, textJSON) {
    if (purpose === "generic_template") {
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": textJSON
                }
            }
        };
    } else if (purpose === "text") {
        return {text: textJSON}
    }
}

function sendSettingsMessage(sender) {
    sendTextMessage(sender, "These are your settings in carousel form with buttons to unsubscribe");
}
