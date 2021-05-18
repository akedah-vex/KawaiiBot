/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file log.js
 * @author Henry Graves
 * @date 5/11/2021
 * @version 0.0.2
 */
const timeStamp = require('./timeStamp')
const fs = require('fs')

module.exports = log = (event) => {
    let ts = timeStamp()
    let time = ts.time
    let date = ts.date
    let newLog = `
+-------------------------------------------
|:::::::::::::::::New Event:::::::::::::::::
|
|time:       @${time} on ${date}
|content:    ${event.content}
|username:   ${event.author.username}#${event.author.id}
|
|___________________________________________

`
    console.log(newLog)
    fs.writeFile(`logs/kawaiiBot-command-log-${date}.txt`, newLog, {flag: 'a+'}, (error, fd) => {
        if (error) return console.error(error)
    })
}