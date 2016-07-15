var TelegramBot = require('node-telegram-bot-api');

var token = '188599675:AAHDng9h7Cbi4AGkBweDrn0xHdIp8zUSy2M';

var botOptions = {
    polling: true
};

var Utilites = {};

var bot = new TelegramBot(token, botOptions);
var aboutMe = null;

var
    CARDS_ARRAY = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K',
        'A',
    ],
    COLORS_ARRAY = [
        '♥',
        '♦',
        '♣',
        '♠',
    ];

bot.getMe().then(function(me)
{
    aboutMe = me;
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});

bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;
    var firstName = msg.from.first_name;

    if (messageText === '/say') {
        sendMessageByBot(messageChatId, 'Hello World!');
        return;
    }
	
	if (messageText === '/test') {
        bot.sendSticker(messageChatId, 'cards/ca.jpg');
    }

    if (messageText === '/start') {
        sendMessageByBot(messageChatId, 'Привет, ' + firstName + '! Давай сыграем в блекджек?');
        sendMessageByBot(messageChatId, 'Вот твоя карта ' + getNewCard() );
        return;
    }

    if (messageText === 'еще') {
        sendMessageByBot(messageChatId, 'держи ' + getNewCard() );
        return;
    }

    if (messageText === '/stop') {
        sendMessageByBot(messageChatId, 'Пока, ' + firstName + '. Буду рад увидеть тебя еще раз...');
        return;
    }

    sendMessageByBot(messageChatId, 'Все говорят ' + messageText + ', а ты купи слона! xD');

    console.log(msg);
});

function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a cute bot!' });
}

function getNewCard () {
    var rndValue = Utilites.randomInteger(0,12);
    var rndColor = Utilites.randomInteger(0,3);
    return CARDS_ARRAY[rndValue] + COLORS_ARRAY[rndColor];
};


Utilites.randomInteger = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
};


