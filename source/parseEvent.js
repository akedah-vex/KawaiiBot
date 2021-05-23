/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file bot.js
 * @author Henry Graves
 * @date 2/5/2021
 * @version 0.0.2
 */

require('dotenv').config()
const fs            = require('fs')
const scrape        = require('./scrape.js')
const play          = require('./play.js')
const log           = require('./log')
const remove        = require('./deleteEvent.js')
const logicGuards   = require('./logicGuards.js')

/**
 * processEvent
 * 
 * @brief   determines the nature of the
 *          event and processes accordingly.
 * 
 * @param   event   The event object passed in from the 
 *                  discord client.
 * @return  promise The promise resolved.
 */
module.exports = parseEvent = async (event) => {
    let promise = new Promise((resolve, reject) => {
        log(event)
        if (logicGuards(event)) return;
        // declare / set local scope vars
        let message = event.content
        let args = message.split(' ')
        let author = '<@'+event.author.id+'>'
        let dir = 'C:/Users/Vex/Google Drive/KawaiiBot/audio/'
        let files = fs.readdirSync(dir)
        let fileObj = { files: [] }

        /**
         * populate files from shared dir for voice commands
         * loop through voice commands
         */
        for (file in files) {
            if (files[file].split('.')[0] == event.content.split(' ')[0].split('/')[1]) {
                voiceCommand = true
                if (event.member.voice.channel) {
                    play (
                        `${dir}${files[file]}`, event.member.voice.channel
                    ).then((result) => {
                        result[0].play(result[1])
                    })
                    remove(event)
                    return
                } else {
                    event.channel.send('Why are you so null dude? :\\')
                    return
                }
            }
        }

        /**
         * If an audio clip was not found, search for images
         * re-set the dir to search and loop again.
         */
        dir = 'C:/Users/Vex/Google Drive/KawaiiBot/images/'
        files = fs.readdirSync(dir)
        for (file in files) {
            if (files[file].split('.')[0] == event.content.split(' ')[0].split('/')[1]) {
                fileObj = {
                    files: [`${dir}${files[file]}`]
                }
                resolve({string: '', fileObj})
                return
            }
        }

        /**
         * If we still haven't returned after searching for
         * pre-defined audio/images, perform a webscrape for a
         * random gif related to the search term.
         */
        if (args.length == 1) {
            event.channel.send(author)
            resolve(scrape(args[0]))
            return
        } else {
            let mention = `${author} ${message.split('/')[1]}`
            event.channel.send(mention)
            resolve(scrape(args[0]))
            return
        }
    }).catch((error) => {
        console.error("ERROR: ", error)
    })
    return promise
}