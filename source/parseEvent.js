/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file bot.js
 * @author Henry Graves
 * @date 2/5/2021
 * @version 0.0.2
 */
const scrape = require('./scrape.js')
const play = require('./play.js')
const fs = require('fs')
let dir = 'C:/Users/Vex/Google Drive/KawaiiBotSounds'
const discord = require('discord.js')
/**
 * processEvent function, determines the nature of the
 * event and processes accordingly.
 */
module.exports = parseEvent = async (event) => {
    let promise = new Promise((resolve, reject) => {
        // deconstruct
        let message = event.content
        let sendHelp = false;
        // grab args
        let args = message.split(' ')
        // declare / set vars
        let tag = ''
        let author = '<@'+event.author.id+'>'
        let files = fs.readdirSync(dir)
        let help = ""
        // confirmed command attempt
        // populate files from shared dir for voice commands
        for (file in files) {
            if (event.content == './help') {
                help += './'+files[file].split('.')[0]+'\n'
                sendHelp = true
                return
            } else if (files[file].split('.')[0] == event.content.split(' ')[0].split('/')[1]) {
                console.log(files[file])
                voiceCommand = true
                if (event.member.voice.channel) {
                    play(
                        `C:/Users/Vex/Google Drive/KawaiiBotSounds/${files[file]}`, 
                        event.member.voice.channel
                        ).then((result) => {
                            result[0].play(result[1])
                    })
                    event.delete().catch((error) => {
                        console.error(error)
                    })
                    return
                } else {
                    event.channel.send('Why are you so null dude? :\\')
                    return
                }
            }
        }
        if (sendHelp) {
            let msg = new discord.MessageEmbed()
                .setTitle("Voice Channel Commands:")
                .setDescription(help)
                .setThumbnail('http://cdn.discordapp.com/avatars/740565901522239510/029c236d99de4c8cec13e982471f6e60.png')
            event.author.send(msg)
            event.delete().catch((error) => {
                console.error(error)
            })
            sendHelp = false;
            return
        }

        // if mentioned, grab the @ for text commands
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
        event.delete().catch((error) => {
            console.error(error)
        })
    }).catch((error) => {
        console.error("ERROR: ", error)
    })
    return promise
}