'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const tg = new Telegram.Telegram('188599675:AAHDng9h7Cbi4AGkBweDrn0xHdIp8zUSy2M')

class Cards {
    constructor(){
        this.CARDS_ARRAY = [
            {name: ' 2♥ ', value: 2},
            {name: ' 3♥ ', value: 3},
            {name: ' 4♥ ', value: 4},
            {name: ' 5♥ ', value: 5},
            {name: ' 6♥ ', value: 6},
            {name: ' 7♥ ', value: 7},
            {name: ' 8♥ ', value: 8},
            {name: ' 9♥ ', value: 9},
            {name: ' 10♥ ', value: 10},
            {name: ' J♥ ', value: 2},
            {name: ' Q♥ ', value: 3},
            {name: ' K♥ ', value: 4},
            {name: ' A♥ ', value: 11},

            {name: ' 2♦ ', value: 2},
            {name: ' 3♦ ', value: 3},
            {name: ' 4♦ ', value: 4},
            {name: ' 5♦ ', value: 5},
            {name: ' 6♦ ', value: 6},
            {name: ' 7♦ ', value: 7},
            {name: ' 8♦ ', value: 8},
            {name: ' 9♦ ', value: 9},
            {name: ' 10♦ ', value: 10},
            {name: ' J♦ ', value: 2},
            {name: ' Q♦ ', value: 3},
            {name: ' K♦ ', value: 4},
            {name: ' A♦ ', value: 11},

            {name: ' 2♠ ', value: 2},
            {name: ' 3♠ ', value: 3},
            {name: ' 4♠ ', value: 4},
            {name: ' 5♠ ', value: 5},
            {name: ' 6♠ ', value: 6},
            {name: ' 7♠ ', value: 7},
            {name: ' 8♠ ', value: 8},
            {name: ' 9♠ ', value: 9},
            {name: ' 10♠ ', value: 10},
            {name: ' J♠ ', value: 2},
            {name: ' Q♠ ', value: 3},
            {name: ' K♠ ', value: 4},
            {name: ' A♠ ', value: 11},

            {name: ' 2♣ ', value: 2},
            {name: ' 3♣ ', value: 3},
            {name: ' 4♣ ', value: 4},
            {name: ' 5♣ ', value: 5},
            {name: ' 6♣ ', value: 6},
            {name: ' 7♣ ', value: 7},
            {name: ' 8♣ ', value: 8},
            {name: ' 9♣ ', value: 9},
            {name: ' 10♣ ', value: 10},
            {name: ' J♣ ', value: 2},
            {name: ' Q♣ ', value: 3},
            {name: ' K♣ ', value: 4},
            {name: ' A♣ ', value: 11}
        ];
        this.dealer = [];
        this.player = [];
        this.randomInteger = function(min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        };
    }

    getNewCard(pl) {
        var rndValue = this.randomInteger(0, this.CARDS_ARRAY.length - 1);
        var card = this.CARDS_ARRAY.splice(rndValue, 1)[0];
        if(pl)
            this.player.push(card);
        else
            this.dealer.push(card);
        return card.name;
    };

    calcDealer(){
        var dealer = 0;
        this.dealer.forEach(function(card){
            dealer = dealer + card.value;
        });
        return dealer;
    }

    finish(){
        var dealer = 0;
        var player = 0;
        
        this.player.forEach(function(card){
            player = player + card.value;
        });
        this.dealer.forEach(function(card){
            dealer = dealer + card.value;
        });

        var winner = false;
        if(player > 21) winner = false;
        if(dealer > 21 && player <= 21) winner = true;
        if(player >= dealer && player <= 21) winner = true;

        return 'У тебя ' + player + ' очков, у дилера ' + dealer + ' очков. Ты ' + (winner ? 'победил' : 'проиграл') + '!';
    }
}

class StartController extends TelegramBaseController {

    startHandler($) {
        $.runMenu({
            message: 'Когда будешь готов, нажми кнопку начать игру',
            resizeKeyboard: true,
            'Начать игру': function () {
                new RunController().startHandler($);
            }
        })
    }

    get routes() {
        return {
            '/start': 'startHandler'
        }
    }
}

//TODO добавить чтобы нельзя было брать больше 5-ти карт
class RunController extends TelegramBaseController {

    startHandler($){
        var cards = new Cards();
        var cardsPlayer = []; var cardsDealer = [];
        cardsPlayer.push(cards.getNewCard(true));
        cardsDealer.push(cards.getNewCard());
        cardsDealer.push(cards.getNewCard());
        $.sendMessage('Карты дилера: ' + cardsDealer.join(''));
        function menu(firstRun) {
            cardsPlayer.push(cards.getNewCard(true));
            if(!firstRun) {
                if (cards.calcDealer() < 16) {
                    cardsDealer.push(cards.getNewCard());
                    $.sendMessage('Дилер взял: ' + cardsDealer.join(''));
                } else {
                    $.sendMessage('Дилер воздержался: ' + cardsDealer.join(''));
                }
            }
            $.runMenu({
                message: 'Ваши карты: ' + cardsPlayer.join(''),
                resizeKeyboard: true,
                'еще': function () {
                    menu();
                },
                'хватит': function () {
                    if (cards.calcDealer() < 16) {
                        cardsDealer.push(cards.getNewCard());
                        $.sendMessage('Дилер взял: ' + cardsDealer.join(''));
                    }
                    $.sendMessage(cards.finish());
                    new StartController().startHandler($);
                }
            })
        }
        menu(true);
    }

    get routes() {
        return {
            '/run': 'startHandler'
        }
    }
}


class OtherwiseController extends TelegramBaseController {
    handle($) {
        //$.sendMessage('Я не понимаю о чем ты ¯ \ _ (ツ) _ / ¯')
        new StartController().startHandler($);
    }
}

tg.router
    .when(['/run'], new RunController())
    .when(['/start'], new StartController())
    .otherwise(new OtherwiseController())