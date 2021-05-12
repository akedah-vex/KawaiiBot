/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file log.js
 * @author Henry Graves
 * @date 5/11/2021
 * @version 0.0.2
 */
const time = new Date()
const fs = require('fs')

module.exports = log = (event) => {
    let newLog = "::New Event::\n" + "time: " + time.getTime() + "\n content:" + event.content + "\n"
    console.log("")
    console.log(newLog)
    console.log(event.author.username + "#" + event.author.id)
}