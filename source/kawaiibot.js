/**
 * @name        kawaiibot.js
 * @description A class for multiple kawaiibot functions
 * @date        5/22/2021
 * @author      Henry Graves
 */
require('dotenv').config()
const Discord       = require('discord.js')
cleverbot = new Cleverbot();
cleverbot.configure({botapi: process.env.CLEVERBOT_API_KEY});
module.exports = Kawaiibot = class {
    constructor (client) {
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`)
            client.user.setStatus("online");
            client.user.setActivity('with your heart')
        })
        client.login(process.env.DISCORD_TOKEN)
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

    /**
     * @name    deleteEvent
     * 
     * @brief   deletes commands from discord chat
     *          to keep the chat clean.
     * 
     * @param   event   The event object passed in from the 
     *                  discord client.
     */
    deleteEvent = (event) => {
        event.delete().catch((error) => {
            console.error(error)
        })
    }

    /**
     * @name    resolveResult
     * @brief   See file description
     * @param   result  The result object to resolve
     * @returns boolean The true/false result of whether or not
     *                  the result object has a file object associated.
     */
    resolveResult = (result) => {
        if (result.fileObj == null)
            return false
        return true
    }

    /**
     * @name    send
     * 
     * @brief   A quick wrapper function for the discord.js
     *          event.channel.send function. If the result contains
     *          file object then send along that object with the result
     *          string. Else send purely the result as it will be only a
     *          string and not an object.
     * @param   event   The event object passed in from the 
     *                  discord client.
     *          result  The result to be sent.
     * @returns none.
     */
    send = (event, result) => {
        if (resolveResult(result))
            event.channel.send(result.string, result.fileObj)
        event.channel.send(result)
    }

    /**
     * @name    guardReturn
     * @brief   A quick helper function just to clean up the 
     *          below function return.
     * @param   event The event object passed down from the
     *                discord client
     * @returns boolean     ALWAYS
     */
    guardReturn = (event) => {
        remove(event)
        return true
    }

    /**
     * @name logicGuards
     * 
     * @brief   This function is a set of logical guards, if any of them
     *          are caught, this function returns true and will force the
     *          function it is invoked from to return immediately.
     * @param   event   The event passed in from the discord client.
     * @returns Boolean A true or false value depending on the event content.
     * @note    All of these if's have a resulting action and WILL return true.
    */
    logicGuards = (event, client) => {
        let tbatz = "Tbatz is a fucking loser for adding the oceanman file."
        if (event.content.startsWith('~/*'))        { botSpeak(event, client);              return guardReturn(event) }
        event.content = event.content.toLowerCase()
        if (event.content.startsWith('./say'))      { speak(event);                         return guardReturn(event) }
        if (event.content.includes('./oceanman'))   { event.author.send(tbatz);             return guardReturn(event) }
        if (event.content == './commands')          { event.author.send(getHelpMessage());  return guardReturn(event) }
        if (event.content == 'ricardo')             { event.channel.send(ricardo());        return true               }
        if (event.content == 'uwu')                 { event.channel.send(uwu());            return true               }
        if (event.content.startsWith('./stop'))     {
            playSound (
                `C:/Users/Vex/Google Drive/KawaiiBot/audio/gunshot.mp3`, 
                event.member.voice.channel
            ).then((result) => {
                result[0].play(result[1])
            })
            return guardReturn(event)
        }
        return false
    }

    /**
     * checks an event.content to see if any mentions appear
     */
    mentioned = (event) => {
        let prefix = '<@!'
        // mention has happened (probably), grab the whole mention.
        if (event.content.includes(prefix)) {//740565901522239510
            // this chain of splits gets the user ID
            return event.content.split(prefix)[1].split('>')[0] 
        }
    }

    clever = (event) => {
        event.content = filterMentions(event.content)
        cleverbot.write(event.content, (response) => {
            event.channel.send(
                randomInt(100) < 50 ? response.output += ` ${emoji.random()}` : response.output
            )
        })
    }
}