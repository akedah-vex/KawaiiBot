/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file bot.js
 * @author Henry Graves
 * @date 2/5/2021
 * @version 0.0.2
 */
require('dotenv').config()
const scrape = require('./scrape.js')
const play = require('./play.js')
const fs = require('fs')
const log = require('./log')
const discord = require('discord.js')
const remove = require('./deleteEvent.js')
const ricardo = require('./asciArt/ricardo')
const uwu = require('./asciArt/uwu')
const https = require('https')
var giphy = require('giphy-api')(process.env.GIPHY_TOKEN);
/**
 * processEvent function, determines the nature of the
 * event and processes accordingly.
 */
module.exports = parseEvent = async (event) => {
    log(event) // send to log api
    let promise = new Promise((resolve, reject) => {
        // declare / set vars
        let tag = ''
        let message = event.content
        let args = message.split(' ')
        let author = '<@'+event.author.id+'>'
        let dir = 'C:/Users/Vex/Google Drive/KawaiiBot/audio/'
        let files = fs.readdirSync(dir)
        let helpLink = "https://www.henrygraves.dev/kawaiibotcommands"
        let fileObj = {
            files: []
        }
        let helpMsg = new discord.MessageEmbed()
            .setColor('0xff0000')
            .setTitle("KawaiiBot Voice Commands")
            .setDescription(helpLink)
            .setURL(helpLink)
            .setThumbnail('https://images.fineartamerica.com/images/artworkimages/medium/2/zero-two-reo-anime-transparent.png')
        
        // confirmed command attempt
        // populate files from shared dir for voice commands
        
        // command list / meme guards
        if (event.content == './commands')                                 { resolve(helpMsg); return }
        if (event.content == 'ricardomilos' || event.content == 'ricardo') { resolve(ricardo); return }
        if (event.content == "uwu")                                        { resolve(uwu); return }
        if (event.content.startsWith('///'))                               { botSpeak(event, client); return }
        // end meme guards

        // loop through voice commands
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
        // if not audio, loops through images
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