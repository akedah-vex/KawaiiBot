/**
 * checks an event.content to see if any mentions appear
 */
module.exports = mentioned = (event) => {
    let prefix = '<@!'
    // mention has happened (probably), grab the whole mention.
    if (event.content.includes(prefix)) {//740565901522239510
        // this chain of splits gets the user ID
        return event.content.split(prefix)[1].split('>')[0] 
    }
}