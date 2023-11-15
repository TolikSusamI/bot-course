const TelegramApi= require("node-telegram-bot-api")
const {gameOption, againOption} = require("./options.js")
const token = "6434657141:AAE0fYpgJiMkeCzJkGJcCN20LiQ_bwrJAr4"

const opt = {polling:true}

const bot = new TelegramApi(token, opt);

chats={}

const startGame = async(chatId) => {
    await bot.sendMessage(chatId, "ОТГДАЙ ЗАГАДКУ! СЛЕВА ЛЕС ГОВНА, А СПРАВА МОРЕ МОЧИ. КУДА ЛЕТИМ?")
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "ОТГАДЫВАЙ ХУЛИ МОЛЧИШЬ", gameOption)
}


const start = () => {
    bot.setMyCommands([
        {command: "/start", description: "Старт"},
        {command: "/info", description: "Инфо"},
        {command: "/game", description: "Отгадай число"}
    ])
    
    bot.on("message", async msg => {
        const text = msg.text;
        const chatId = msg.chat.id
        if(text === "/start"){
            return bot.sendMessage(chatId, `ДОБРО ПОЖАЛОВАТЬ ГАНДОН`)
        }
        if(text === "/info"){
            return bot.sendMessage(chatId, `КАКАЯ ИНФОРМАЦЦИЯ, ИДИ ТЫ НАХУЙ КАЗЁЛ ${msg.from.first_name}`)
        }
        if(text === "/game"){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, "ХУЙНЮ ПИШЕШЬ");
    })

    bot.on("callback_query", async msg => {
        console.log(msg)
        const data = msg.data;
        console.log(data)
        const chatId = msg.message.chat.id;
        if(data === "/again")
            return startGame(chatId)
        if(data == chats[chatId]){
            return bot.sendMessage(chatId, `МОЛОТОК ПРАВИЛЬНО!!!`, againOption);
        }
        return bot.sendMessage(chatId, `ХАХАХА ЛОШАРА НЕПРАВИЛЬНО ОТВЕТ: ${chats[chatId]}`,againOption);
    })
    
}

start()