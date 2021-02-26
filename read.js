/**
 * @name read.js
 * @description file reading api
 * @author Henry Graves
 * @date 2/6/2021
 */
//'C:/Users/Vex/Google Drive/KawaiiBotSounds'
const fs = require('fs')
module.exports = read = (dir) => {
    let files = []
    fs.readdir(dir).forEach(file => {
        files.push(file)
    })
    return files
}