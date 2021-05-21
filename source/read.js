/**
 * @name read.js
 * @description file reading api
 * @author Henry Graves
 * @date 2/6/2021
 * @deprecated 3/1/2021
 */

const fs = require('fs')
module.exports = read = (dir) => {
    let files = []
    fs.readdir(dir).forEach(file => {
        files.push(file)
    })
    return files
}