/**
 * @name        kawaiibot.js
 * @description A class for multiple kawaiibot functions
 * @date        5/22/2021
 * @author      Henry Graves
 */
require('dotenv').config()
const Discord           = require('discord.js')
const logicGuards       = require('./logicGuards')
const parseEvent        = require('./parseEvent')
const send              = require('./send')
const deleteEvent       = require('./deleteEvent')
const mentioned         = require('./mentioned')
const clever            = require('./clever')
const notSelf           = require('./constants/notSelf')
const roleCheck = require('./roleCheck')


module.exports = Kawaiibot = class {
    id = '740565901522239510'
    client = new Discord.Client()

    /**
     * @name    ready
     * @brief   Bot init, await for ready status from client,
     *          then log in.
     * @param   none.
     */
    constructor () {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`)
            this.client.user.setStatus('online');
            this.client.user.setActivity('New World Queue')
        })
        this.client.login(process.env.DISCORD_TOKEN)
    }

    /**
     * @name    getMessages
     * @brief   Bot init, await for ready status from client,
     *          then log in
     * @param   none
     */
    getMessages = () => {
        /**
         * @name    message
         * 
         * @brief   Event block, parse and process all message events here
         * 
         * @param   event   The message event that gets passed in when a user
         *                  types a message into a chat channel.
         */
        this.client.on('message', async (event) => {
            if (logicGuards(event, this.client)) return
            event.content = event.content.toLowerCase()
            if (event.content.startsWith('./')) {
                await parseEvent(event).then((result) => {
                    send(event, result)
                }).catch(error => { console.error("ERROR: ", error) })
                deleteEvent(event) // delete the command from the chat
            } else if (event.channel.type == "dm") {
                roleCheck(event)
                clever(event, event.channel.type)
            } else if (mentioned(event) == this.id) {
                clever(event, event.channel.type)
            }
        })
    }

    /**
     * @name    getClient
     * @brief   returns the client object
     * @return  The client object
     */
    getClient = () => {
        return this.client
    }
}