/**
 * @name        kawaiibot.js
 * @description A class for multiple kawaiibot functions
 * @date        5/22/2021
 * @author      Henry Graves
 */
require('dotenv').config()
const Discord       = require('discord.js')
module.exports = Kawaiibot = class {
    client = new Discord.Client()
    constructor () {
        
    }
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
    parseEvent = async (event) => {
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
}