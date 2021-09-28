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
const PrettyError   = require('pretty-error')
const pe            = new PrettyError();
const KawaiiBot     = require('./source/kawaiibot')
const kawaiibot     = new KawaiiBot()

/**
 * Global variables that shouldn't exist tbh.
 * Deprecate party forming?
 */
let partyData
let players = []
let playerCount = 1
let maxPlayers = 5
let partyForming = false

/**
 * Start Pretty Error
 */
pe.start();

/**
 * @name    getMessages
 * @brief   Bot init, await for ready status from client,
 *          then log in.
 * @param   none.
 */
kawaiibot.getMessages()

kawaiibot.getClient().on('guildMemberAdd', member => {
    member.send('Welcome to ' + member.guild.name + "!")
    if (member.guild.id == '398202575675064321') {
        member.send("If you're joining for new world, just ask me for the \"new world role\" :)")
    }
})


/**
 * @name    messageReactionAdd
 * 
 * @brief   This is some beta ass nonsense, it's improper and needs to be
 *          cleaned up but I'm too lazy to gaf rn.
 * @param   reaction    The reaction the user added to the message
 *          user        The user that added the reaction
 * @deprecated 5/24/2021
 */
kawaiibot.getClient().on('messageReactionAdd', async (reaction, user) => {
    return // currently disable this feature
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
kawaiibot.getClient().on('voiceStateUpdate', (oldState, newState) => {
    if (!oldState.channel) return
    if (oldState.channel.members.size == 1)
        oldState.channel.leave()
})

















/*
 spooky comment.
 */