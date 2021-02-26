/**
 * @name random.js
 * @brief A function for generating pseudo random integers
 */

module.exports = getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}