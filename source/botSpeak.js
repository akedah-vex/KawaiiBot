/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file botSpeak.js
 * @author Henry Graves
 * @date 2/5/2021
 * @version 0.0.2
 */

module.exports = botSpeak = (event, client) => {
    let msg = event.content.split('///')[1]
    client.channels.cache.get("398213925050646559").send(msg)
    event.delete().catch((error) => {
        console.error(error)
    })
}