/**
 * @name clever
 * @description     A clever bot API implementation!
 * @date 5/21/21
 */
 require('dotenv').config()
 const Cleverbot        = require('cleverbot-node')
 const emoji            = require('emoji-random')
 const randomInt        = require('./random')
 const filterMentions   = require('./filterMentions')
 cleverbot = new Cleverbot();
 cleverbot.configure({botapi: process.env.CLEVERBOT_API_KEY});
 
module.exports = clever = (event, type) => {
    event.content = filterMentions(event.content)
    cleverbot.write(event.content, (response) => {
        if (type == "dm") {
            event.author.send(
                randomInt(100) < 50 ? response.output += ` ${emoji.random()}` : response.output
            ).catch()
            console.log("   |__ KawaiiBot: " + response.output)
        } else {
            event.channel.send(
                randomInt(100) < 50 ? response.output += ` ${emoji.random()}` : response.output
            )
        }
        
    })
}