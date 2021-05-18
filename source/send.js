/**
 * @name send.js
 * @description wrapper for event.channel.send because event.channel.send
 *              is too long
 * @author Henry Graves
 * @date 5/17/2021
 */
const resolveResult = require('./resolveResult')
module.exports = send = (event, result) => {
    resolveResult(result) ? event.channel.send(result.string, result.fileObj) : event.channel.send(result)
}