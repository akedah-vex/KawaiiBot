const readline = require('readline')

/**
 * Only purpose is to provide a prompt in command line
 * while the bot is running. May add commands in the
 * future.
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
console.log(">>")
while(true) {
    rl.question('', () => {
        console.log(">>")
        rl.close()
    })
    rl.on('close', () => {
        process.exit(0)
    })
}