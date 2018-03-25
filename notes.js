// function sendVideo(sender) {
//     let messageData = {
//         "attachment": {
//             "type": "video",
//             "payload":{
//                 "url": "https://www.youtube.com/watch?v=4LhoLxOIv3E"
//             }
//         }
//     }
//     facebookRequestMethod(sender, messageData);
// }

// how do i get a list of somebodies interests and subscribe them to news about it
//    --> Subscribe Button on their interests? Do i somehow add suggestions?
//    --> Once they click subscribe button --> store interest name (Lebron James)
//    --> Then update database table with userID and SubscriptionID columns with new info
// how do i sync up alerts from TeamStream with sending alerts thru FB message
//    --> Basically all users that have that SubscriptionID will be messaged...
//    --> Check if that user is also in the Facebook Messenger Database...
//    --> If yes, then
    //    --> You just have to call sendPushMessage with the correct messagedata...
    //    --> The message data should be easy --> image_url from the pushnotification
//    -->                                 --> item_url from the pushnotification path
//    -->                                 --> title from pushnotification message
//    -->
//    --> If no, then
    //    --> Don't worry about it because that is already working.


//    --> API -> DB -> "push notifications" table
// what does FB provide for me?
//    --> id,
//    --> favorite athletes,
//    --> favorite teams,
//    --> first name, last name,
//    --> gender,
//    --> locale,
//    --> Device?

// 6.
/// MAX NUMBERS:
// MAX Carousel Objects: 10
// Max Buttons: 3
// Max Words: 50





/////////////////////////////////////////////////////////The following gets user info://////////////////////////////////////////////
/////////////////////////////////////////////////////////The following gets user info://////////////////////////////////////////////
/////////////////////////////////////////////////////////The following gets user info://////////////////////////////////////////////
/////////////////////////////////////////////////////////The following gets user info://////////////////////////////////////////////

// curl -X GET "https://graph.facebook.com/v2.6/<USERID>?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=<ACCESSTOKEN>"

// curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=<ACCESSTOKEN>"

//////////////////////////////////////////The following is for a welcome message ///////////////////////////////////////////////////
//////////////////////////////////////////The following is for a welcome message ///////////////////////////////////////////////////
//////////////////////////////////////////The following is for a welcome message ///////////////////////////////////////////////////
//////////////////////////////////////////The following is for a welcome message ///////////////////////////////////////////////////
//////////////////////////////////////////The following is for a welcome message ///////////////////////////////////////////////////


// curl -X POST -H "Content-Type: application/json" -d '{
//   "setting_type":"greeting",
//   "greeting":{
//     "text":"Welcome to the Bleacher Report Bot!"
//   }
// }' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=<ACCESSTOKEN>"


// curl -X POST -H "Content-Type: application/json" -d '{
//   "setting_type":"call_to_actions",
//   "thread_state":"new_thread",
//   "call_to_actions":[
//     {
//       "payload":"greetingWelcome to the Bleacher Report Bot!"
//     }
//   ]
// }' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=<ACCESSTOKEN>"


//////////////////////////////////////////The following is to get user data? ///////////////////////////////////////////////////
//////////////////////////////////////////The following is to get user data? ///////////////////////////////////////////////////
//////////////////////////////////////////The following is to get user data? ///////////////////////////////////////////////////
//////////////////////////////////////////The following is to get user data? ///////////////////////////////////////////////////

    // user_details_url = "https://graph.facebook.com/v2.6/%s"%fbid
    // user_details_params = {'fields':'first_name,last_name,profile_pic', 'access_token':'<page-access-token>'}
    // user_details = requests.get(user_details_url, user_details_params).json()

//////////////// The following to set up and modify the persistent menu //////////////////////////////////////////

// curl -X POST -H "Content-Type: application/json" -d '{
//   "setting_type" : "call_to_actions",
//   "thread_state" : "existing_thread",
//   "call_to_actions":[
//     {
//       "type":"postback",
//       "title":"Help",
//       "payload":"menu help"
//     },
//     {
//         "type": "postback",
//         "title": "Settings",
//         "payload": "menu settings"
//     },
//     {
//       "type":"postback",
//       "title":"My Scores",
//       "payload":"menu scores"
//     },
//     {
//       "type":"web_url",
//       "title":"Download Team Stream",
//       "url":"https://itunes.apple.com/us/app/team-stream/id418075935?mt=8"
//     },
//     {
//       "type":"postback",
//       "title":"My Streams",
//       "payload": "menu qr"
//     }
//   ]
// }' "https://graph.facebook.com/v2.6/<APPID>/thread_settings?access_token=<ACCESSTOKEN>"
