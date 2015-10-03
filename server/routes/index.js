var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Stock API', user: req.user });
});


router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err) {
    if (err) {
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', ensureAuthenticated, function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/tester', ensureAuthenticated, function(req, res){
  res.json('tester');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
