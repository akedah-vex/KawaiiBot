
const time = new Date()
const fs = require('fs')

module.exports = log = (event) => {
    let newLog = "::New Event::" + time.getTime() + "\n" + event
    console.log(newLog)
}