/**
 * @description A helper function to filter out @'s
 *              (mentions) from a message in discord
 */

module.exports = filterMentions = (messageToFilter) => {
    let newMessage = ''
    let messageArray = messageToFilter.split(' ')
    for (message in messageArray) {
        if (!messageArray[message].includes('<@!')) {
            newMessage += messageArray[message]
        }
    }
    return newMessage
}