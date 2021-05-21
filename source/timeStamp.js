/**
 * @file timeStamp.js
 * @author Henry Graves
 * @date 2/5/2021
 * @description a simple module to return a timestamp object
 *              with the current time and date as properties
 */

/**
 * @name    timeStamp
 * @brief   Parse the Date object and return a timestamp object easily usable.
 * 
 * @param   none
 * @return  Object  The timestamp object containing a current time and date.
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