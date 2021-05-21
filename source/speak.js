/**
 * @name speak.js
 * @date 2.6.21
 * @description function for speaking in tts using say package
 */
const say = require('say')
const playSound = require('./play.js')
module.exports = speak = (event) => {
    say.export(
        event.content.split('./say')[1], 
        'Microsoft Zira Desktop', 
        1, 
        'out.wav', 
        (err) => {
            if (err) {
                return console.error(err)
            } else {
                playSound (
                    `out.wav`, event.member.voice.channel
                ).then((result) => {
                    result[0].play(result[1])
                })
            }
        }
    )
}
