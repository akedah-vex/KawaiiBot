

module.exports = Queue = class {
    constructor () {
        this.size = 0
        this.first = null
        this.last = null
        this.current = null
    }
    enqueue (node) {
        let _node = new Node(node)
        if (this.size == 0) {
            this.first = _node;
            this.last = _node;
            this.current = _node;
            _node.next = null;
            _node.prev = null;
        } else {
            _node.next = this.first;
            this.first.prev = _node;
            this.current = _node;
            this.first = _node;
            _node.prev = null;
        }
        this.size++
    }
    dequeue () {
        let node = this.last;
        this.last = this.last.prev;
        return node.data;
    }
    print () {
        for (i in this.size) {
            console.log(dequeue().data)
        }
    }
}

let Node = class {
    constructor (data) {
        this.data = data
        this.next = null
        this.prev = null
    }
}