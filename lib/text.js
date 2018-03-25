var acceptable_greetings = ['hi', 'hey', 'hello', 'yo', 'greetings', 'sup', 'what\'s up', 'howdy', 'whats up', 'waddup', 'yo yo'];

var greeting_responses = [
"Hey 8-)! If you have a favorite team or athete, just let me know the full name (i.e. \"NFL\", \"New York Knicks\", \"Lebron James\" or \"Duke Basketball\") and I\'ll send you some cool stuff!",
"Hi there, let\'s get started 🎉. Enter a league name (\"NBA\"), team name (\"Chicago Cubs\" or \"Duke Basketball\") or even an athlete's full name (\"Stephen Curry\" 💛) and we can get started...I can't wait!",
"Greetings! I am here to provide you with the latest sports news on a league, team, or player of your choice. Just go ahead and type something like NFL, New York Rangers or Stephen Curry ;)",
"Yo yo, hit me up with what you wanna see. Enter team name, player name, or league name."
];

var apologies = [
"So, I\'m good at talking about athletes, teams, or leagues. Other stuff, not so much. Try typing \'help\' if you need help",
"Sorry, but I dont understand what you\'re saying. Enter a team name, athlete, or league and I\'ll hit you up with some rad content",
"I did not understand that...like at all. Maybe try typing out an athlete's full name, a team name or like a league name ¯\\_(ツ)_/¯",
"EPIC FAIL! Either we suck at searching or you suck at knowing what you want, but we couldn't find anything on that. try again, bro",
"Uhh...this is awkward but I couldn't find anything. Try being more specific! 😘"];

var help_messages = [
"I\'m happy to help. Here\'s what I can do right now: \n" +
"\n  • Search for any league, team or player like \'NBA\' or \'College Football\', \'Duke Football\' or \'Stephen Curry\'" +
"\n  • Or just type in \"Arizona\" and you\'ll get some options!" +
"\n  • Change your alert settings by typing \"settings\"",
"Of course! Just type in a league, team, or player. Also, you can change your settings by typing in...settings! " +
"If you just want to know what\'s trending, just type trending! It\'s that simple :)",
"Sorry this isn\'t easier :( I am only a few days old so give me some time and I\'ll improve! #work"];

var appreciation_messages = ["thank you", "thx", "thanks", "thank", "ty", "thanks!", "thank you!", "thx!", "tanks", "gracias", "merci", "arigato", "danke"];

var appreciation_responses = ["np", "no prob", "no problem", "any time ;)", "anything for you!", "of course", "😘"];

var stalling_messages = [
"Lemme see what I can fix up for ya...",
"As you wish, Khaleesi...",
"If you\'re ever bored, check out the Game of Zones vids exclusively on the Team Stream app!",
"Download the Team Stream App...just do it...",
"What do you think JR Smith eats for breakfast?",
"\'Wisdom is always an overmatch for strength.\' - Phil Jackson",
"\'If you aren\'t going all the way, why go at all?\' - Joe Namath",
"\'Push yourself again and again. Don\'t give an inch until the final buzzer sounds.\' - Larry Bird",
"\'Do not let what you can not do interfere with what you can do.\' - John Wooden",
"\'It\'s not whether you get knocked down; it\'s whether you get up.\' - Vince Lombardi",
"\'Don't measure yourself by what you have accomplished, but by what you should have accomplished with your ability.\' – John Wooden",
"\'Perfection is not attainable, but if we chase perfection we can catch excellence.\' - Vince Lombardi",
"\'You miss 100 percent of the shots you don\'t take.\' - Wayne Gretsky",
"\'If you aren\'t going all the way, why go at all.\' - Joe Namath",
"\'Champions keep playing until they get it right.\' - Billie Jean King",
"\'A good hockey player plays where the puck is. A great hockey player plays where the puck is going to be.\' - Wayne Gretsky",
"\'If you have everything under control, you\'re not moving fast enough.\' - Mario Andretti",
"\'Set your goals high, and don\'t stop till you get there.\' - Bo Jackson",
"\'It isn\'t the mountains ahread to climb that wear you out; it\'s the pebble in your shoe\' - Muhammad Ali",
"\'The more difficult the victory, the greater the happiness in winning.\' - Pelé",
"\'You can\'t put a limit on anything. The more you dream, the further you get.\' - Michael Phelps",
"\'Never give up! Failure and rejection are only the first steps to succeeding.\' - Jim Valvano",
"\'You\'re never a loser until you quit trying.\'- Mike Ditka",
"\'A champion is someone who gets up when he can\'t.\' - Jack Dempsey",
"\'Never let the fear of striking out get in your way.\' - Babe Ruth",
"\'You have to believe in yourself when no one else does - that makes you a winner right there.\' - Venus Williams",
"\'Adversity cause some men to break; others to break records.\' - William A. Ward",
]

module.exports = {
    acceptable_greetings,
    greeting_responses,
    apologies,
    help_messages,
    appreciation_messages,
    appreciation_responses,
    stalling_messages
}
