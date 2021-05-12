/**
 * @name deleteEvent.js
 * @description wrapper function to easily delete an event
 * @author Henry Graves
 * @date 5/10/2021
 */
module.exports = deleteEvent = (event) => {
    event.delete().catch((error) => {
        console.error(error)
    })
}