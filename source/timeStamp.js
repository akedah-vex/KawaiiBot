/**
 * @name KawaiBot02 discord bot by Henry Graves
 * @file timeStamp.js
 * @author Henry Graves
 * @date 2/5/2021
 * @version 0.0.2
 */

module.exports = timeStamp = () => {
    let currentDate = new Date();
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    let result = {
        time,
        date: `${month}-${day}-${year}`
    }
    return result
}