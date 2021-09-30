const me = require("./me")
/**
 * If the event is casued by the bot, "self"
 * then return false, else return true
 */
module.exports = notSelf = (event) => {
    if (event.author.id == me())
        return false
    return true
}