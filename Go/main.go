package main

import (
    "time"
    "github.com/tucnak/telebot"
)

func main() {
    bot, err := telebot.NewBot("188599675:AAHDng9h7Cbi4AGkBweDrn0xHdIp8zUSy2M")
    if err != nil {
        //log.Fatalln(err)
    }

    messages := make(chan telebot.Message)
    bot.Listen(messages, 1*time.Second)

    for message := range messages {
        if len(message.Text) != 0 {
          bot.SendMessage(message.Chat, "Все говорят " + message.Text + ", а ты купи слона xD", &telebot.SendOptions{
                ReplyMarkup: telebot.ReplyMarkup{
                    ForceReply: true,
                    Selective: true,
                    ResizeKeyboard: true,
                    CustomKeyboard: [][]string{
                        []string{"Начать игру"},
                        []string{"Статистика", "Помощь"},
                    },
                },
            },
          )
        }
        if message.Text == "/hi" {
            bot.SendMessage(message.Chat,
                "Hello, "+message.Sender.FirstName+"!", nil)
        }
        if message.Text == "/test" {
          bot.SendMessage(message.Chat, "pong", &telebot.SendOptions{
                ReplyMarkup: telebot.ReplyMarkup{
                    ForceReply: true,
                    Selective: true,
                    CustomKeyboard: [][]string{
                        []string{"1", "2", "3"},
                        []string{"4", "5", "6"},
                        []string{"7", "8", "9"},
                        []string{"*", "0", "#"},
                    },
                },
            },
          )
        }
        if message.Text == "Начать игру" || message.Text == "/start" {
            bot.SendMessage(message.Chat,
                "Ты нажал тройку", nil)
        }
    }
}
