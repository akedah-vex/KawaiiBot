/**
 * @name        KawaiiBot
 * @file        bot.js
 * @author      Henry Graves
 * @date        2/5/2021
 * @version     0.0.2
 * @description The main js file responsible for connecting to the
 *              discord api, creating the bot client and logging in.
 *              The client then sits and waits for events to fire,
 *              such as a message, channel state update or reaction to
 *              a message in chat.
 */

/**
 * Include Block, include all needed packages / functions
 */
require('dotenv').config()
const Discord       = require('discord.js')
var PrettyError     = require('pretty-error')

const client        = new Discord.Client()
const parse         = require('./source/parseEvent.js')
const formParty     = require('./source/party')
const remove        = require('./source/deleteEvent')
const send          = require('./source/send')

/**
 * Instantiate PrettyError, which can then be used to render error objects
 */
var pe = new PrettyError();
pe.start();

/**
 * Global variables that shouldn't exist tbh.
 */
let partyData
let players = []
let playerCount = 1
let maxPlayers = 5
let partyForming = false

/**
 * @name    ready
 * @brief   Bot init, await for ready status from client,
 *          then log in.
 * @param   none.
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setStatus("online");
    client.user.setActivity('with your heart')
})
client.login(process.env.DISCORD_TOKEN)

/**
 * @name    message
 * 
 * @brief   Event block, parse and process all message events here
 * 
 * @param   event   The message event that gets passed in when a user
 *                  types a message into a chat channel.
 */
client.on('message', async (event) => {
    event.content = event.content.toLowerCase();
    if (event.content.startsWith('./')) {
        await parse(event).then((result) => {
            send(event, result)
        }).catch(error => { console.error("ERROR: ", error)} )
        remove(event) // delete the command from the chat
    } else if (event.content.startsWith('`q')) {
        partyData = await formParty(event)
        game = partyData[0]
        players = partyData[1]
        playerCount = partyData[2]
        partyForming = true;
    }
})

/**
 * @name    messageReactionAdd
 * 
 * @brief   This is some beta ass nonsense, it's improper and needs to be
 *          cleaned up but I'm too lazy to gaf rn.
 * @param   reaction    The reaction the user added to the message
 *          user        The user that added the reaction
 */
client.on('messageReactionAdd', async (reaction, user) => {
    if (!partyForming)
        return
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
        // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }
    console.log(game, " ", playerCount, " ", players)
    if (players.length < maxPlayers) {
        if (user.username == 'KawaiiBot' || players.includes("+ "+user.username))
            return
        players.push("+ "+user.username)
        let msg = new Discord.MessageEmbed()
            .setTitle('Valorant party queue started ')
            .setThumbnail('https://i.imgur.com/RGUkZmy.png')
            .addFields(
                { name: `Players (${playerCount}/${maxPlayers})`, value: players}
            )
            .setFooter('React to this message to join!', 'https://media1.tenor.com/images/ecc46e7dca1e13982b41fbe404764145/tenor.gif?itemid=17412863');
        reaction.message.edit(msg)
        // let party = await editParty(reaction.message)
        // reaction.message.edit(party)
        playerCount++;
    } else if (players.length >= maxPlayers) {
        let msg = new Discord.MessageEmbed()
            .setTitle('Valorant party queue started')
            .setThumbnail('https://i.imgur.com/RGUkZmy.png')
            .setImage()
            .addFields(
                { name: `Players (${playerCount}/${maxPlayers})`, value: players}
            )
            .setFooter('This party is now full', 'https://media1.tenor.com/images/ecc46e7dca1e13982b41fbe404764145/tenor.gif?itemid=17412863');
        reaction.message.edit(msg)
    }
})

/**
 * @name    voiceStateUpdate
 * 
 * @brief   This code block is responsible for checking to see
 *          if there are less than 1 members connected to the 
 *          voice channel the bot is currently in.
 *          If this is the case, disconnect the bot.
 * 
 * @param   oldState     The old state of the voice channel
 *          newState     The new state of the voice channel
 */
client.on('voiceStateUpdate', (oldState, newState) => {
    if (!oldState.channel) return
    if (oldState.channel.members.size == 1)
        oldState.channel.leave()
})








/*
 spooky comment.
 */