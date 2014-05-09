var config = {
    "mongo" : {
        "host" : "localhost",
        "port" : "27017",
        "db" : "chat",
        "table" : {
            "collectionUser": "user",
            "collectionChat": "chat"
        }
    },
    "server" : {
        "port":"3000",
        "host" : "localhost"
    },
    "session" : {
        "db" : "session",
        "secret" : "Jiodslgh"
    }
}

module.exports = config;
