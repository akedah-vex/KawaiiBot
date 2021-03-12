const Queue = require('./queue')

let queue = new Queue()

for (i in 10) {
    queue.enqueue(`TEST${i}`)
}
let node = queue.dequeue()

console.log(node)