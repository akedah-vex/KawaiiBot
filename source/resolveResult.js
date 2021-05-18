/**
 * @name resolveResult.js
 * @description takes in the result object and returns correct value
 * @author Henry Graves
 * @date 2/6/2021
 */

module.exports = resolveResult = (result) => {
    if (result.fileObj == null && result.string == null)
        return false
    return true
}