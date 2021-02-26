/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file bot.js
 * @author Henry Graves
 * @date 2/5/2021
 * @version 0.0.2
 */
const scrape = require('./scrape.js')
const play = require('./play.js')
/**
 * processEvent function, determines the nature of the
 * event and processes accordingly.
 */
module.exports = parseEvent = async (event) => {
    let promise = new Promise((resolve, reject) => {
        // deconstruct
        let message = event.content
        
        // grab args
        let args = message.split(' ')
        // declare / set vars
        let tag = ''
        let author = '<@'+event.author.id+'>'

        // confirmed command attempt
        // populate files from shared dir
        

        // if mentioned, grab the @
        for (arg in args) {
            if (args[arg].includes('<@!'))
                tag = args[arg]
                break
        }

        // if sound command, execute, ignore scrape /text

        if (args.length == 1) {
            event.channel.send(`<@!${event.author.id}>`)
            resolve(scrape(args[0]))
        } else {
            event.channel.send(author + " " + message.split('/')[1] + " " + tag)
            resolve(scrape(args[0]))
        }

        // if /cmd <tag> -> perform action on <tag>

        // how to differentiate between all of these?
        // text action -> webscrape and text ouput
        // voice actions -> play sound file
        // tts action -> invoke say
    }).catch((error) => {
        console.error("ERROR: ", error)
    })
    return promise
}