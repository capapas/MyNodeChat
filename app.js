var express = require("express");
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ent = require('ent');

var authenticate = require('./routes/authentication');

var config  = require('./config/config.js');

// connection mongo *************************************************************** 
var mongo = require('mongodb');
var monk = require('monk');
var port = config.server.port;
var db = monk(config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db);

var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

var debug = require('debug')('my-application');
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

// Add var in application ********************************************************************************* 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.use(function(req,res,next){
    req.db = db;
    req.session = session;
    next();
});

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use('/authentication', authenticate);

app.get("/", function(req, res){
    res.render("chat");
});

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    
    db.get(config.mongo.table.collectionChat).find({}, {}, function (err, items) {

        var i;
        for (i = 0; i < items.length; i++) {
            
            io.sockets.emit('message', items[i]);
        }
    });
    
    socket.on('send', function (data) {

        data.message =  ent.encode(data.message);
        data.date = new Date();
        if (data.username) {
            db.get(config.mongo.table.collectionChat).insert(data, function(){});
        }        
        io.sockets.emit('message', data);
    });
});
module.exports = app;




