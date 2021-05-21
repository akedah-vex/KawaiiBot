/**
 * @name send.js
 * @description wrapper for event.channel.send because event.channel.send
 *              is too long
 * @author Henry Graves
 * @date 5/17/2021
 */

/**
 * @name    send
 * 
 * @brief   A quick wrapper function for the discord.js
 *          event.channel.send function. If the result contains
 *          file object then send along that object with the result
 *          string. Else send purely the result as it will be only a
 *          string and not an object.
 * @param   event   The event object passed in from the 
 *                  discord client.
 *          result  The result to be sent.
 * @returns none.
 */
const resolveResult = require('./resolveResult')
module.exports = send = (event, result) => {
    if (resolveResult(result))
        event.channel.send(result.string, result.fileObj)
    event.channel.send(result)
}