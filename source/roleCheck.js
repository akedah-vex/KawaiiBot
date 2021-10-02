/**
 * @name    
 */
const notSelf = require("./constants/notSelf");

module.exports = roleCheck = (event) => {
    if (event.content.includes('new') && 
        event.content.includes('world') && 
        event.content.includes('role') && notSelf()) {
        let guild = this.client.guilds.cache.find(({name}) => name === "Deimos Esports Community")
        let role = guild.roles.cache.find(({name}) => name === '👻 New World Members')
        let member = guild.members.cache.find(
            ({ user: {username, discriminator} }) =>
                `${username}#${discriminator}` === event.author.username + "#" + event.author.discriminator,
        )
        member.roles.add(role);
        event.author.send('New world role added! Have fun!')
        console.log("Added new world role to: ", event.author.username + "#" + event.author.discriminator)
    } else if (event.content.includes('new') && event.content.includes('world')) {
        event.author.send("If you want the new world members role, make sure you say new world role in your message!")
    } 
}