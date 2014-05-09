/**
 * @type {{mongo: {host: string}}}
 */
var config = {
    "mongo" : {
        "host" : "localhost",
        "port" : "27017",
        "db" : "chat"
    },
    "socket" : {
        "port":"3001",
        "host" : "localhost"
    },
    "session" : {
        "db" : "session",
        "secret" : "Jiodslgh"
    }
}

module.exports = config;