/**
 * @file play.test.js
 * @brief test suite for even parser
 */

const assert = require('assert');
const play = require('../source/play');
const discord = require("discord.js")

describe('play.js tests:', () => {
  it('play null', () => {
    let audioFile = {
      content = "./help"
    }
    let channel = {

    }
    play(audioFile, channel)
  })
})