[![Build Status](https://travis-ci.org/HenryGraves/KawaiiBot.svg?branch=master)](https://travis-ci.org/HenryGraves/KawaiiBot)
[![Coverage Status](https://coveralls.io/repos/github/HenryGraves/KawaiiBot/badge.svg?branch=master)](https://coveralls.io/github/HenryGraves/KawaiiBot?branch=master)
# KawaiiBot [DEPRECATED]
The bot has been deprecated as it uses a very old method to integrate with discord.
This can be updated but I have no time to do so. Maybe in the future. o7

A personal recreation of the once popular discord bot named the same.

---
## Requirements

For development, you will only need node.js and npm.

### FFmpeg
- Currently this project is dependent on ffmpeg for audio functionality. Voice channel commands will not function properly without it
- https://ffmpeg.org/


### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
---

## Install

    $ git clone https://github.com/HenryGraves/KawaiiBot
    $ cd KawaiiBot
    $ npm install

## Running the project

    $ npm start
