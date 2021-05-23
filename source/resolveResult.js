/**
 * @name resolveResult.js
 * @author Henry Graves
 * 
 * @description takes in the result object and returns a true/false
 *              value depending on if result has a file object or not.
 * @date 2/6/2021
 */

/**
 * @name    resolveResult
 * @brief   See file description
 * @param   result  The result object to resolve
 * @returns boolean The true/false result of whether or not
 *                  the result object has a file object associated.
 */
module.exports = resolveResult = (result) => {
    if (result.fileObj == null)
        return false
    return true
}