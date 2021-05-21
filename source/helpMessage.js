/**
 * @name getHelpMesage
 * @file getHelpMessage.js
 * @author Henry Graves
 * @date 2/5/2021
 * @version 0.0.2
 */
const discord = require('discord.js')
module.exports = getHelpMessage = () => {
    let helpLink = "https://www.henrygraves.dev/kawaiibotcommands"
    let thumbnailLink = 'https://images.fineartamerica.com/images/artworkimages/medium/2/zero-two-reo-anime-transparent.png'
    return new discord.MessageEmbed()
        .setColor('0xff0000')
        .setTitle("KawaiiBot Voice Commands")
        .setDescription(helpLink)
        .setURL(helpLink)
        .setThumbnail(thumbnailLink)
}