var express = require('express');
var router = express.Router();
var config = require('../config/config');

/* GET home page. */
router.get('/', function (req, res) {
console.log("test");
    res.render('authenticate');
});

/* POST login form. */
router.post('/authentication', function (req, res) {

    var login = req.body.username;
    var pass = req.body.pass;

    var db = req.db;
    
    var collection = db.get(config.mongo.table.collectionUser);
    collection.find({'user': login, 'pass': pass}, {}, function (e, docs) {
        if (docs.length == 0) {

            console.log('Not Exit');
            res.render('error-custom', {message: 'User doesn\'t exist'});

        } else {
            console.log('Exit');
            console.log(req.session);
            //socket.set('nickname', login);
            res.render('chat');
        }
    });

    console.log(login + " - " + pass);
});

/* GET login form. */
router.get('/inscription', function (req, res) {
    res.render('inscription');
});

/* POST Inscription form. */
router.post('/validateInscription', function (req, res) {

    var login = req.body.username;
    var pass = req.body.pass;
    var confirmpass = req.body.confirmpass;

    var db = req.db;
    
    console.log(req.body);
    
    if (login.lenght > 0 && pass.lenght > 0) {
        res.render('error-custom', {message: 'Username and password must be not null'});
    }
    
    if (confirmpass == pass) {
        res.render('error-custom', {message: 'The two password must be the same'});
    }
    
    var collection = db.get('user');
    collection.find({'user': login}, {}, function (e, docs) {
        if (docs.length > 0) {
            res.render('error-custom', {message: 'Username already exist'});
        }
        
        var colUser = {
            "user" : login,
            "pass" : pass,
            "insc" : new Date()
        }
            
        collection.insert(colUser, function(){
            res.render('chat')
        });
    });  
});


module.exports = router;
