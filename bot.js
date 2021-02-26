/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file bot.js
 * @author Henry Graves
 * @date 2/5/2021
 * @version 0.0.2
 */

 /**
  * Include Block, include all needed packages / functions
  */
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const parse = require('./includes/parseEvent.js')
const fs = require('fs')
const play = require('./includes/play.js')
let dir = 'C:/Users/Vex/Google Drive/KawaiiBotSounds'
let global = 0
let voiceCommand = false;
/**
 * Bot init, await for ready status from client,
 * then log in.
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
client.login(process.env.DISCORD_TOKEN)

/**
 * Event block, parse and process all message events here
 */
client.on('message', async (event) => {
    if (event.content.startsWith('./') || event.content.startsWith('/')) {
        let files = fs.readdirSync(dir)
        let help = "Voice channel commands: \n"
        let sendHelp = false
        for (file in files) {
            if (event.content == './help') {
                help += './'+files[file].split('.')[0]+'\n'
                sendHelp = true
            } else if (files[file].split('.')[0] == event.content.split(' ')[0].split('/')[1]) {
                console.log(files[file])
                voiceCommand = true
                if (event.member.voice.channel) {
                    await play(
                        `C:/Users/Vex/Google Drive/KawaiiBotSounds/${files[file]}`, 
                        event.member.voice.channel
                        ).then((result) => {
                            result[0].play(result[1])
                        })
                    break
                } else {
                    event.channel.send('Why are you so null dude? :\\')
                    break
                }
            }
        }

        if (sendHelp)
            event.author.send(help)

        if ( !voiceCommand && !sendHelp) {
            await parse(event).then((result, error) => {
                if (!error) {
                    console.log("client.on message: " + result)
                    event.channel.send(`${result}`)
                } else {
                    console.error("ERROR: ", error)
                }
            })
            
        }
        voiceCommand = false
        await event.delete().catch((error) => {
            console.error(error)
        })
    }
})

