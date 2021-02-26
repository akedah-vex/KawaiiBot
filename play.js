/**
 * @name play.js
 * @author Henry Graves
 * @date 2/6/2021
 */

const { resolve } = require("url")

module.exports = playSound = (audioFile, channel) => {
    let promise = new Promise((resolve, reject) => {
        channel.join().then(connection => {
            let result = [connection, audioFile]
            resolve(result)
        }).catch(err => console.log(err))
    }).catch((err) => {
        console.error(err);
    })
    return promise;
}