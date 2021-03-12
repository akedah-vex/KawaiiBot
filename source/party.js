const Discord = require('discord.js')

module.exports = formParty = (event) => {
    let promise = new Promise((resolve, reject) => {
        let game = event.content.split(' ')[1]
        let mention = event.content.split(' ')[2]
        let players = ["+ "+event.author.username]
        let playerCount = players.length;
        let maxPlayers = 5;
        game = game[0].toUpperCase() + game.substring(1,game.length);
        let msg = new Discord.MessageEmbed()
            .setTitle(game + ' party queue started ')
            .setThumbnail('https://i.imgur.com/RGUkZmy.png')
            .addFields(
                { name: `Players (${playerCount}/${maxPlayers})`, value: players}
            )
            .setFooter('React to this message to join!', 'https://media1.tenor.com/images/ecc46e7dca1e13982b41fbe404764145/tenor.gif?itemid=17412863');
        event.channel.send(msg).then((sent) => {
            sent.react("👍")
        })
        let data = [game, players, playerCount, mention]
        resolve(data)
    })
    return promise;
}

// module.exports = editParty = (party) => {
//     let promise = new Promise((resolve, reject) => {
//         resolve(console.log(party))
//     })
//     return promise;
// }