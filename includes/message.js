/**
 * @name message.js
 * @description direct message discord api
 * @author Henry Graves
 * @date 2/6/2021
 */

module.exports = message = (event, user) => {
    user.send("dm")
}