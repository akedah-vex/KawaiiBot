/**
 * message.test.js
 * a test suite for the message module
 */
const message = require('../source/message')
const assert = require('assert');

describe('message.js tests:', function() {
    it('can send a message', function() {
        class User {
            send = (string) => {
                return string
            }
        }
        class Event {
            content = ""
        }
        let user = new User()
        let event = new Event()
        event.content = "dm"
        assert(message(event, user) === "dm");
        delete user, event
    });

    it('returns "" on empty string', function() {
        class User {
            send = (string = null) => {
                return string
            }
        }
        class Event {
            content = ""
        }
        let user = new User()
        let event = new Event()
        event.content = ""
        assert(message(event, user) === "");
        delete user, event
    })

    it('returns null with event = null', function() {
        class User {
            send = (string = null) => {
                return string
            }
        }
        class Event {
            content = ""
        }
        let user = new User()
        let event
        assert(message(event, user) === null);
        delete user, event
    })
});