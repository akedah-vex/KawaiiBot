/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file log.js
 * @author Henry Graves
 * @date 5/11/2021
 * @version 0.0.2
 */

const timeStamp = require('./timeStamp')
const fs        = require('fs')

/**
 * @name    log
 * 
 * @brief   A logging function that will output an event log to the
 *          console and also write it to a log file under a /logs/
 *          folder.
 * @param   event   The event object passed in from the discord client.
 *          output  The output type of the log, either "file" or "console"
 *                  if, nothing or something else is passed in, it defaults
 *                  to outputting to both the console AND a log file.
 * @return  console.error   Possible to return console.error from the writeFile if
 *                          anything fails.
 */
module.exports = log = (event, output) => {
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
    if (output == 'file') {
        fs.writeFile(`logs/command-log-${date}.txt`, newLog, {flag: 'a+'}, (error, fd) => {
            if (error) return console.error(error)
        })
    } else if (output == 'console') {
        console.log(newLog)
    } else {
        fs.writeFile(`logs/command-log-${date}.txt`, newLog, {flag: 'a+'}, (error, fd) => {
            if (error) return console.error(error)
        })
        console.log(newLog)
    }
}