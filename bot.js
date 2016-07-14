var TelegramBot = require('node-telegram-bot-api');

var token = '188599675:AAHDng9h7Cbi4AGkBweDrn0xHdIp8zUSy2M';

var botOptions = {
    polling: true
};

var bot = new TelegramBot(token, botOptions);
var aboutMe = null;

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
    }

    if (messageText === '/start') {
        sendMessageByBot(messageChatId, 'Привет, ' + firstName + '! Давай сыграем в блекджек?');
    }

    if (messageText === '/stop') {
        sendMessageByBot(messageChatId, 'Пока, ' + firstName + '. Буду рад увидеть тебя еще раз...');
    }

    console.log(msg);
});

function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a cute bot!' });
}