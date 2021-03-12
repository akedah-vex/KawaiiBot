/**
 * @name message.js
 * @description direct message discord api
 * @author Henry Graves
 * @date 2/6/2021
 */

module.exports = message = (event, user) => {
    if (event == null)
        return null
    return user.send(event.content)
}