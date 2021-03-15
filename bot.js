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
const parse = require('./source/parseEvent.js')
const fs = require('fs')
const play = require('./source/play.js')
const message = require('./source/message')
const scrape = require('./source/scrape.js')
const formParty = require('./source/party')
var PrettyError = require('pretty-error');

// instantiate PrettyError, which can then be used to render error objects
var pe = new PrettyError();
pe.start();
let global = 0
let partyData
let voiceCommand = false;
let players = []
let playerCount = 1;
let maxPlayers = 5;
let partyForming = false;
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
    event.content = event.content.toLowerCase();
    if (event.content.startsWith('///')) {
        // admin talk
        let msg = event.content.split('///')[1]
        client.channels.cache.get("398213925050646559").send(msg)
        event.delete().catch((error) => {
            console.error(error)
        })
    } else if (event.content.startsWith('./') || event.content.startsWith('/')) {
        console.log("")
        console.log(event.author.username + "#" + event.author.id)
        await parse(event).then((result, error) => {
            if (error) {
                console.error("ERROR: ", error)
            }
            console.log("client.on message: " + result)
            event.channel.send(`${result}`)
        })
        event.delete().catch((error) => {
            console.error(error)
        })
    } else if (event.content.startsWith('`q')) {
        partyData = await formParty(event)
        game = partyData[0]
        players = partyData[1]
        playerCount = partyData[2]
        partyForming = true;
    }
})

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
            .setTitle('Valorant party queue started ')
            .setThumbnail('https://i.imgur.com/RGUkZmy.png')
            .setImage()
            .addFields(
                { name: `Players (${playerCount}/${maxPlayers})`, value: players}
            )
            .setFooter('This party is now full', 'https://media1.tenor.com/images/ecc46e7dca1e13982b41fbe404764145/tenor.gif?itemid=17412863');
        reaction.message.edit(msg)
        // let party = await editParty(reaction.message)
        // reaction.message.edit(party)
    }

})

