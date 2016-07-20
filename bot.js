var _ = require("underscore");

var TelegramBot = require('node-telegram-bot-api');

var token = '188599675:AAHDng9h7Cbi4AGkBweDrn0xHdIp8zUSy2M';

var botOptions = {
    polling: true
};

var Utilites = {};

var bot = new TelegramBot(token, botOptions);
var aboutMe = null;

var session = [];

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
    CARDS_VALUES = {
        '2' : 2,
        '3' : 3,
        '4' : 4,
        '5' : 5,
        '6' : 6,
        '7' : 7,
        '8' : 8,
        '9' : 9,
        '10' : 10,
        'J' : 2,
        'Q' : 3,
        'K' : 4,
        'A' : 11,
    },
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

    if(!session[messageChatId])
        session[messageChatId] = {};

    if (messageText === '/say') {
        sendMessageByBot(messageChatId, 'Hello World!');
        return;
    }
	
	if (messageText === '/test') {
        bot.sendSticker(messageChatId, 'cards/ca.jpg');
    }

    if (messageText === '/start') {
        sendMessageByBot(messageChatId, 'Привет, ' + firstName + '! Давай сыграем в блекджек?');
        sendMessageByBot(messageChatId, 'Напиши /run');
        //sendMessageByBot(messageChatId, 'Вот твоя карта ' + getNewCard() );
        return;
    }

    if (messageText === '/run') {
        sendMessageByBot(messageChatId, 'Вот твои карты ' + getNewCard(messageChatId, 'pl') + ' ' + getNewCard(messageChatId, 'pl'));
        sendMessageByBot(messageChatId, 'Вот карты дилера' + getNewCard(messageChatId, 'dl') + ' ' + getNewCard(messageChatId, 'dl'));
        sendMessageByBot(messageChatId, 'Если нужно еще, напиши /еще');
        sendMessageByBot(messageChatId, 'Если хватит, напиши /хватит');
        return;
    }

    if (messageText === '/еще') {
        sendMessageByBot(messageChatId, 'держи ' + getNewCard(messageChatId, 'pl') );
        return;
    }

    if (messageText === '/хватит') {
        sendMessageByBot(messageChatId, 'Ты ' + checkCards(messageChatId));
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

function getNewCard (chatId, who) {
    var rndValue = Utilites.randomInteger(0,12);
    var rndColor = Utilites.randomInteger(0,3);
    if(chatId){
        if(!session[chatId][who])
            session[chatId][who] = [];
        session[chatId][who].push(rndValue);
    }
    return CARDS_ARRAY[rndValue] + COLORS_ARRAY[rndColor];
};

function checkCards(chatId) {
    var dealerSum = 0, playerSum = 0;
    session[chatId].dl.forEach(function(card){
        dealerSum = dealerSum + CARDS_VALUES[card];
    });
    session[chatId].pl.forEach(function(card){
        playerSum = playerSum + CARDS_VALUES[card];
    });
    if(playerSum > 21)
        return 'проиграл, у тебя ' + playerSum + ' очков';
    if(playerSum < 21 && playerSum > dealerSum)
        return 'выиграл, у тебя ' + playerSum + ' очков';
    else
        return 'проиграл, у тебя ' + playerSum + ' очков';
}


Utilites.randomInteger = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
};


