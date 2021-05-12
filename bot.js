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
const formParty = require('./source/party')
var PrettyError = require('pretty-error')
const remove = require('./source/deleteEvent')
const { isArray } = require('util')


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
    client.user.setStatus("online");
    client.user.setActivity('with your heart')
})
client.login(process.env.DISCORD_TOKEN)

/**
 * Event block, parse and process all message events here
 */
client.on('message', async (event) => {
    event.content = event.content.toLowerCase();
    
    
    if (event.content.startsWith('./')) {
        await parse(event).then((result, error) => {
            
            if (error)
                console.error("ERROR: ", error)
            console.log("client.on message: " + result)

            if (isArray(result)) { // isArray is deprecated but it works really well so?
                let fileOptions = result[1]
                event.channel.send(`${result[0]}`, fileOptions ? fileOptions : null)
            } else {
                event.channel.send(`${result}`)
            }
            
        }).catch(error => { console.error("ERROR: ", error)} )
        remove(event)

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

client.on('voiceStateUpdate', (voiceChannel, user) => {
    if (voiceChannel && 
    voiceChannel.channel && 
    voiceChannel.channel.members && 
    voiceChannel.channel.members.size) {
        let members = voiceChannel.channel.members.size
        console.log(voiceChannel.channel.members.size)
        if (members == 1) {
            voiceChannel.channel.leave()
        }
    }
})



/*

 */