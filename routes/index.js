var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
//    if (req.session.username) {
//        // User is authenticated, let him in
//        res.render('index');
//    } else {
//        // Otherwise we redirect him to login form
//        res.redirect("/authenticate/");
//    }

    res.render('index', { title: 'My AWSOME CHAT' });

});

module.exports = router;
