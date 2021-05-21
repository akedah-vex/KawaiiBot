const ricardo           = require('./asciArt/ricardo')
const uwu               = require('./asciArt/uwu')
const getHelpMessage    = require('./helpMessage')
const speak             = require('./speak')
const remove            = require('./deleteEvent')
const playSound         = require('./play')
/**
 * @name    guardReturn
 * @brief   A quick helper function just to clean up the 
 *          below function return.
 * @param   event The event object passed down from the
 *                discord client
 * @returns boolean     ALWAYS
 */
let guardReturn = (event) => {
    remove(event)
    return true
}
/**
 * @name logicGuards
 * 
 * @brief   This function is a set of logical guards, if any of them
 *          are caught, this function returns true and will force the
 *          function it is invoked from to return immediately.
 * @param   event   The event passed in from the discord client.
 * @returns Boolean A true or false value depending on the event content.
 * @note    All of these if's have a resulting action and WILL return true.
*/
module.exports = logicGuards = (event) => {
    let tbatz = "Tbatz is a fucking loser for adding the oceanman file."
    if (event.content.startsWith('./say'))  { speak(event);                         return guardReturn(event) }
    if (event.content == './oceanman')      { event.author.send(tbatz);             return guardReturn(event) }
    if (event.content == './commands')      { event.author.send(getHelpMessage());  return guardReturn(event) }
    if (event.content == 'ricardomilos')    { event.channel.send(ricardo());                        return guardReturn(event) }
    if (event.content == "uwu")             { event.channel.send(uwu());                            return guardReturn(event) }
    if (event.content.startsWith('///'))    { botSpeak(event, client);              return guardReturn(event) }
    if (event.content.startsWith('./stop')) {
        playSound (
            `C:/Users/Vex/Google Drive/KawaiiBot/audio/gunshot.mp3`, 
            event.member.voice.channel
        ).then((result) => {
            result[0].play(result[1])
        })
        return guardReturn(event)
    }
    return false
}