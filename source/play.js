/**
 * @name play.js
 * @author Henry Graves
 * @date 2/6/2021
 */

/**
 * @name playSound
 * 
 * @brief   A wrapper to easily join a voice channel and set up to
 *          play an audio file. Call .play() using the indicies of the
 *          returned array.
 * 
 * @param   audioFile   The audio file path to play.
 *          channel     The discord channel to play it in.
 * @returns Promise     The resolved array result.
 */
module.exports = playSound = (audioFile, channel) => {
    let promise = new Promise((resolve, reject) => {
        channel.join().then(connection => {
            let result = [connection, audioFile]
            resolve(result)
        }).catch(err => console.log(err))
    }).catch((err) => {
        console.error(err);
    })
    return promise;
}