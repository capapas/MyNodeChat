var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('authenticate');
});

/* POST login form. */
router.post('/authentication', function(req, res) {
nodes.session.set();
    var login = req.body.user;
    var pass = req.body.pass;

    var db = req.db;
    var collection = db.get('user');
    collection.find({'user' : login, 'pass': pass},{},function(e,docs){
        if (docs.length == 0) {
            res.render('error-custom', {message: 'User doesnt exist'});
        } else {
            res.render('index');
            console.log(docs);
        }
    });

    console.log(login + " - " + pass);
});

/* GET login form. */
router.get('/inscription', function(req, res) {
    res.render('inscription');
});

/* POST Inscription form. */
router.post('/validateInscription', function(req, res) {
    console.log("Je me suis inscrit");
});


module.exports = router;
